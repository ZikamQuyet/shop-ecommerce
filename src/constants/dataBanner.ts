import { images } from '../assets'

export interface IDataBanner {
  id: string
  img: string
  href: string
}

export const dataMainBanner: IDataBanner[] = [
  {
    id: 'b1',
    img: images.slider1,
    href: '/collections'
  },
  {
    id: 'b2',
    img: images.slider1,
    href: '/collections'
  },
  {
    id: 'b3',
    img: images.slider1,
    href:'/collections'
  }
]

export const dataStoryBanner: IDataBanner[] = [
  {
    id: 'sb1',
    img: images.sliderStory1,
    href: '/collections'
  },
  {
    id: 'sb2',
    img: images.sliderStory2,
    href: '/collections'
  }
]
