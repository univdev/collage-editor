import { Element } from '../types/canvas';
import LeftFrameImage from '@/assets/images/image-area--left.png';
import RightFrameImage from '@/assets/images/image-area--right.png';

const [width, height] = [335, 596];
const [imageWidth, imageHeight] = [200, 260];

export default [
  {
    position: [width / 2, 100],
    type: 'text',
    content: '2020',
    font: 'Amiri',
    size: 24,
    align: 'center',
    level: 3,
  },
  {
    position: [width / 2, 120],
    type: 'text',
    content: 'SUMMER',
    font: 'Amiri',
    size: 48,
    align: 'center',
    level: 3,
  },
  {
    position: [0, height - (imageHeight * 1.2)],
    type: 'image',
    frame: LeftFrameImage,
    level: 5,
    width: imageWidth,
    height: imageHeight,
    contentDegree: 10,
    padding: 35,
  },
  {
    position: [
      width - imageWidth,
      height - imageHeight + (imageHeight / 8),
    ],
    type: 'image',
    frame: RightFrameImage,
    level: 4,
    width: imageWidth,
    height: imageHeight,
    contentDegree: -5,
    padding: 30,
  }
] as Element[];