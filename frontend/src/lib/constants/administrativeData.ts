type Ward = {
  [wardId: string]: string;
};

interface District {
  name: string;
  wards: Ward[];
}

interface Province {
  name: string;
  districts: { [districtId: string]: District };
}

export const administrativeData: { [provinceId: string]: Province } = {
  "ha-noi": {
    name: "Hà Nội",
    districts: {
      "hoan-kiem": {
        name: "Hoàn Kiếm",
        wards: [
          { "phuong-hang-trong": "Phường Hàng Trống" },
          { "phuong-hang-bac": "Phường Hàng Bạc" },
        ],
      },
      "ba-dinh": {
        name: "Ba Đình",
        wards: [
          { "phuong-cong-vi": "Phường Cống Vị" },
          { "phuong-ngoc-ha": "Phường Ngọc Hà" },
        ],
      },
    },
  },
  "ho-chi-minh": {
    name: "Hồ Chí Minh",
    districts: {
      "quan-1": {
        name: "Quận 1",
        wards: [
          {
            "phuong-ben-nghe": "Phường Bến Nghé",
          },
          {
            "phuong-ben-thanh": "Phường Bến Thành",
          },
        ],
      },
      "quan-3": {
        name: "Quận 3",
        wards: [{ "phuong-1": "Phường 1" }, { "phuong-2": "Phường 2" }],
      },
    },
  },
  "da-nang": {
    name: "Đà Nẵng",
    districts: {
      "hai-chau": {
        name: "Hải Châu",
        wards: [
          { "phuong-hai-chau-1": "Phường Hải Châu 1" },
          { "phuong-hai-chau-2": "Phường Hải Châu 2" },
        ],
      },
      "thanh-khe": {
        name: "Thanh Khê",
        wards: [
          { "phuong-thanh-khe-tay": "Phường Thanh Khê Tây" },
          { "phuong-thanh-khe-dong": "Phường Thanh Khê Đông" },
        ],
      },
    },
  },
};
