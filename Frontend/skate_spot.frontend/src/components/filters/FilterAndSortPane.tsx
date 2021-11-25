import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import SortIcon from "@mui/icons-material/Sort";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Slider from "@mui/material/Slider";
import { SurfaceScore } from "../spot_common/SurfaceScore";
import MuiInput from "@mui/material/Input";

interface Props {}

enum SortOption {
  CREATION_DATE,
  LIKES,
  COMMENTS,
  VIDEOS,
}

export const FilterAndSortPane: React.FC<Props> = () => {
  const [sortOption, setSortOption] = useState(SortOption.CREATION_DATE);
  const [sortAscending, setSortAscending] = useState(false);

  const [surfaceScoreEnabled, setSurfaceScoreEnabled] = useState(false);
  const [surfaceScoreGTFilter, setSurfaceScoreGTFilter] = useState(true);
  const [surfaceScore, setSurfaceScore] = useState(5);

  return (
    <div className="ms-3">
      <div className="d-flex">
        <Select
          style={{ fontSize: "1rem" }}
          className="me-2"
          onChange={(e) => setSortOption(e.target.value as SortOption)}
          value={sortOption}
          label="Age"
        >
          <MenuItem value={SortOption.CREATION_DATE}>Creation date</MenuItem>
          <MenuItem value={SortOption.LIKES}>Likes</MenuItem>
          <MenuItem value={SortOption.COMMENTS}>Comments</MenuItem>
          <MenuItem value={SortOption.VIDEOS}>Videos</MenuItem>
        </Select>
        <Button onClick={() => setSortAscending(!sortAscending)}>
          {sortAscending ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
          <SortIcon />
        </Button>
      </div>
      <div className="mt-4">
        <p className="m-0">Surface score</p>
        <div className="d-flex align-items-center">
          <Checkbox
            onChange={() => setSurfaceScoreEnabled(!surfaceScoreEnabled)}
            checked={surfaceScoreEnabled}
          />
          <Button
            disabled={!surfaceScoreEnabled}
            className="py-0"
            onClick={() => setSurfaceScoreGTFilter(!surfaceScoreGTFilter)}
            style={{ fontSize: "1.2rem" }}
          >
            {surfaceScoreGTFilter ? "≥" : "≤"}
          </Button>
          <Slider
            disabled={!surfaceScoreEnabled}
            min={1}
            max={10}
            value={surfaceScore}
            onChange={(_, value) => setSurfaceScore(value as number)}
          />
          <TextField
            disabled={!surfaceScoreEnabled}
            variant="standard"
            className="ms-3"
            // style={{ color: "white" }}
            value={surfaceScore}
            size="small"
            onChange={(e) => setSurfaceScore(Number(e.target.value))}
            inputProps={{
              step: 1,
              min: 1,
              max: 10,
              type: "number",
            }}
          />
        </div>
      </div>
      <Button className="mt-5" variant="contained" color="secondary">
        Apply
      </Button>
    </div>
  );
};
