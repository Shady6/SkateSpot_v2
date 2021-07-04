import { Collection, Item, ItemGroup, PropertyList, QueryParam, QueryParamDefinition, Request } from "postman-collection";
import nodefetch from "node-fetch";

require('dotenv').config();
require('source-map-support').install()
const fs = require('fs');
const converter = require('openapi-to-postmanv2');

interface IObject {
    [key: string]: any;
}

const postmanBaseUrl = "https://api.getpostman.com";
const apiBaseUrl = "http://localhost:12513/swagger/v1/swagger.json";

const fetchPostman = async (url: string, body: string | undefined = undefined, method: string = "GET") => {
    return await nodefetch(postmanBaseUrl + url, {
        method: method,
        body: body,
        headers: {
            "X-Api-Key": String(process.env.API_KEY)
        }
    });
};

const main = async () => {
    let response = await fetchPostman(`/collections/${process.env.SKATESPOT_COLLECTION_UID}`);
    let oldPostmanColl = new Collection((await response.json()).collection)
    // fs.writeFile('skatespot_collection_node_old.json', JSON.stringify(oldPostmanColl), () => { });

    response = await nodefetch(apiBaseUrl);
    let openApiColl = await response.text();
    converter.convert({ type: "string", data: openApiColl }, {}, (err: any, res: any) => {
        let newPostmanColl = new Collection(res.output[0].data);
        // fs.writeFile('skatespot_collection_node_new.json', JSON.stringify(newPostmanColl), () => { });

        const updatedColl = mergeCollections(oldPostmanColl, newPostmanColl);        
        UpdateCollectionInPostmanApi(updatedColl).then(res => {
             res.text().then(t => {console.log(t)});
        })
    });
};

const mergeCollections = (oldC: Collection, newC: Collection) => {
    let oldFlat = getFlatListOfItems(oldC);
    let newFlat = getFlatListOfItems(newC);

    fs.writeFile('old_flat.json', JSON.stringify(oldFlat, null, 4), () => { });
    fs.writeFile('new_flat.json', JSON.stringify(newFlat, null, 4), () => { });

    newFlat.forEach(newItem => {
        // Get matching item
        let matchingItem = oldFlat.filter(oldItem => oldItem.name.toLowerCase() == newItem.name.toLowerCase());
        if (matchingItem.length >= 2) {
            throw "Two or more requests from old collection match one request from new collection." +
            "\nRequest name: " + newItem.name;
        }
        // If doesn't exist add new item
        else if (matchingItem.length == 0) {
            oldC.items.add(newItem);
        }
        // Update existing item
        else if (matchingItem.length == 1) {
            let newReq = newItem.request;
            let oldReq = matchingItem[0].request;

            UpdatePath(oldReq, newReq);
            UpdateQueryParams(newReq, oldReq);
            UpdateBody(newReq, oldReq);
        }
    });
    fs.writeFile('merged.json', JSON.stringify(oldC, null, 4), () => { });
    return oldC;
}

const getFlatListOfItems = (col: Collection) => {
    let items: Item[] = new Array<Item>();
    let rootItems = col.items;

    rootItems.each(itemOrItemGroup => {
        if (itemOrItemGroup instanceof Item)
            items.push(itemOrItemGroup);
        if (itemOrItemGroup instanceof ItemGroup)
            itemOrItemGroup.forEachItem(item => {
                items.push(item);
            })
    });

    return items;
}

const UpdatePath = (oldReq: Request, newReq: Request) => {
    oldReq.url.path = newReq.url.path;
}

const UpdateQueryParams = (newReq: Request, oldReq: Request) => {
    if (!newReq.url.query || newReq.url.query.count() == 0) {
        oldReq.url.query = newReq.url.query;
    }
    else {
        let updatedQueryParams: PropertyList<QueryParam> = new PropertyList<QueryParam>("QueryParam", null, []);
        newReq.url.query.each(newQueryParam => {
            let queryDefinition: QueryParamDefinition = {
                key: newQueryParam.key,
                value: oldReq.url.query.get(newQueryParam.key || "") || newQueryParam.value,
                disabled: false
            };
            updatedQueryParams.append(new QueryParam(queryDefinition));
        });
        oldReq.url.query = updatedQueryParams;
    }
}

const UpdateBody = (newReq: Request, oldReq: Request) => {
    if (!newReq.body || !oldReq.body) {
        oldReq.body = newReq.body;
    }
    else {
        let newRaw = JSON.parse(newReq.body.raw as string);
        let oldRaw = JSON.parse(oldReq.body.raw as string);
        let updatedBody: IObject = {};

        for (let key in newRaw) {
            updatedBody[key] = getParameterCaseInsensitive(oldRaw, key) || getParameterCaseInsensitive(newRaw, key);
        }
        oldReq.body.raw = JSON.stringify(updatedBody, null, 4);
    }
}

const getParameterCaseInsensitive = (object: any, key: any) => {
    // @ts-ignore
    return object[Object.keys(object)
        .find(k => k.toLowerCase() === key.toLowerCase())
    ];
}

const UpdateCollectionInPostmanApi = (updatedColl: Collection) => {
    return fetchPostman(`/collections/${process.env.SKATESPOT_COLLECTION_UID}`, JSON.stringify(
        {
            "collection": updatedColl
        }), "PUT");
}

main();






