export interface IDataBanner {
  id: string
  img: string
  href: string
}

export const dataMainBanner: IDataBanner[] = [
  {
    id: 'b1',
    img: 'images/banner/slider_1.jpg',
    href: '/collections'
  },
  {
    id: 'b2',
    img: 'images/banner/slider_1.jpg',
    href: '/collections'
  },
  {
    id: 'b3',
    img: 'images/banner/slider_1.jpg',
    href: '/collections'
  }
]

export const dataStoryBanner: IDataBanner[] = [
  {
    id: 'sb1',
    img: 'images/banner/slider_story_1.jpg',
    href: '/collections'
  },
  {
    id: 'sb2',
    img: 'images/banner/slider_story_2.jpg',
    href: '/collections'
  }
]
