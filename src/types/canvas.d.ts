export type Image = {
  position: [x: number, y: number];
  type: 'image' | 'text',
  level: number,
  width: number;
  height: number;
  frame: string | HTMLImageElement,
  content: string | HTMLImageElement,
  contentDegree: number,
  degree: number,
  padding: number,
};

export type Text = {
  position: [x: number, y: number];
  type: 'image' | 'text',
  level: number,
  content: string,
  size: number,
  font: string,
  align: 'left' | 'center' | 'right',
  color: string,
};

export type Element = {
  type: 'image' | 'text',
} & Image | Text;
