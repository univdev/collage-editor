export declare type Image = {
  frame?: string;
  image?: string;
  degree: number;
  width?: number;
  height?: number;
};

export declare type Text = {
  content?: string;
  degree: number;
  size?: number;
  font?: string;
  align?: 'center' | 'left' | 'right';
};

export declare type Element = {
  position: [x: number, y: number];
  type: 'image' | 'text';
  level: number,
} & Image & Text;

export declare enum Extension {
  png = 'image/png',
  jpg = 'image/jpg',
};
