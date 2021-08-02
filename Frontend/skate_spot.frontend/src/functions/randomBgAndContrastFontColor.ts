
const randomBgAndContrastFontColor = (): [string, string] => {
    const [r, g, b] = [rndColor(), rndColor(), rndColor()]
    const fontColor = (r * 0.299 + g * 0.587 + b * 0.114) > 186
        ? '#000000'
        : '#FFFFFF';
    return [`rgb(${r},${g},${b})`, fontColor]
}

const rndColor = () => Math.floor(Math.random() * 255)

export default randomBgAndContrastFontColor