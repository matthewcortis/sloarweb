const BAN_CHAY = false;
const COMBO_HY_BRID_PATH = "/combo-hy-brid";
const COMBO_ON_GRID_PATH = "/combo-on-grid";

const COMBO_HY_BRID = {
  loaiHeThong: "Hy-Brid",
  page: 0,
  size: 100,
  sortField: "tongGia",
  sortDirection: "ASC",
};

const COMBO_ON_GRID = {
  loaiHeThong: "On-Grid",
  page: 0,
  size: 20,
  sortField: "tongGia",
  sortDirection: "ASC",
};

const PRESETS = {
  "combo-hy-brid": COMBO_HY_BRID,
  "combo-on-grid": COMBO_ON_GRID,
};

const PRESET_BY_PATH = {
  [COMBO_HY_BRID_PATH]: "combo-hy-brid",
  [COMBO_ON_GRID_PATH]: "combo-on-grid",
};

export { BAN_CHAY, PRESETS, PRESET_BY_PATH };
