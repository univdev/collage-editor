export type Image = {
  width: number;
  height: number;
  frame: string | HTMLImageElement,
  content: string | HTMLImageElement,
  contentDegree: number,
  degree: number,
  padding: number,
};

export type Text = {
  content: string,
  size: number,
  font: string,
};

export type Element = {
  position: [x: number, y: number];
  type: 'image' | 'text',
  level: number,
} | Image | Text;
