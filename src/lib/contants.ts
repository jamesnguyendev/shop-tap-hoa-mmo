import { ProductOrderField } from './saleor/generated/graphql';

export const label = [
  { name: 'All' },
  { name: '1 day' },
  { name: '1 week' },
  { name: '1 month' },
  { name: '1 year' }
];
export const label2 = [
  { name: 'Members-only' },
  { name: 'Downloads are available to members only' },
  { name: 'Free model' }
];
export const label3 = [
  { name: 'Checkpoint' },
  { name: 'Textual Inversion' },
  { name: 'Hypernetwork' },
  { name: 'Aesthetic Gradient' },
  { name: 'LoRA' },
  { name: 'LyCORIS' },
  { name: 'Poses' },
  { name: 'Wildcards' },
  { name: 'Other' }
];

export const dataCartProduct = [
  {
    title: '',
    price: '5950 VND',
    src: '',
    seller: 'Tâm Như'
  },
  {
    title: 'Gmail VN Reg Thủ Công Siêu Khỏe Chưa Qua Dịch Vụ',
    price: '2.750 VND',
    src: 'https://taphoammo.net/img/gmail-usa-good_968148.png',
    seller: 'Nmm 099'
  },
  {
    title:
      'TĂNG TƯƠNG TÁC THREADS - Tăng Follow Threads - Tăng Like Threads - Tăng Theo Dõi Threads',
    price: '68 VND',
    src: 'https://taphoammo.net/img/tang-tuong-tac-threads-tang-follow-threads-tang-like-threads-tang-theo-doi-threads_493276.png',
    seller: 'forest_xul90u '
  },
  {
    title: 'Dịch vụ tăng tương tác Twitter Giá Rẻ',
    price: '15.000 VND',
    src: 'https://taphoammo.net/img/dich-vu-tang-tuong-tac-fb-like-sub-comment-view-video_98098288.png',
    seller: 'hungbap123'
  },
  {
    title: 'Tăng Tương Tác Threads giá rẻ bảo hành 30 ngày',
    price: '99 VND',
    src: 'https://taphoammo.net/img/tang-tuong-tac-threads-gia-re-bao-hanh-30-ngay_653993.png',
    seller: 'abe'
  },
  {
    title: 'TĂNG TƯƠNG TÁC FACEBOOK UY TÍN GIÁ RẺ',
    price: '47 VND',
    src: 'https://taphoammo.net/img/tang-tuong-tac-facebook-uy-tin-gia-re.png',
    seller: 'hungbap123 '
  }
];

export const dataSort = [
  {
    name: 'Phổ biến'
  },
  {
    name: 'Giá tăng dần '
  },
  {
    name: 'Giá giảm dần'
  }
];

export const dataFilter = [
  { name: 'Gmail' },
  { name: 'HotMail' },
  { name: 'OutlookMail' },
  { name: 'RuMail' },
  { name: 'DomainMail' },
  { name: 'YahooMail' },
  { name: 'ProtonMail' },
  { name: 'Loại Mail Khác' }
];

export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey?: ProductOrderField;
  reverse?: boolean;
};

export const defaultSort: SortFilterItem = {
  title: 'Thứ tự mặc định',
  slug: null,
  sortKey: ProductOrderField.Rank,
  reverse: false
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  {
    title: 'Thứ tự theo mức độ phổ biến',
    slug: 'populate-desc',
    sortKey: ProductOrderField.Rank,
    reverse: false
  }, // asc
  {
    title: ' Thứ tự theo điểm đánh giá',
    slug: 'rating-desc',
    sortKey: ProductOrderField.Rating,
    reverse: true
  },
  {
    title: 'Mới nhất',
    slug: 'newest-desc',
    sortKey: ProductOrderField.CreatedAt,
    reverse: true
  },
  {
    title: 'Thứ tự theo giá: thấp đến cao',
    slug: 'price-asc',
    sortKey: ProductOrderField.MinimalPrice,
    reverse: false
  }, // asc
  {
    title: 'Thứ tự theo giá: cao xuống thấp',
    slug: 'price-desc',
    sortKey: ProductOrderField.MinimalPrice,
    reverse: true
  }
];
export const sortingCombo: SortFilterItem[] = [
  defaultSort,
  {
    title: 'Thứ tự theo mức độ phổ biến',
    slug: 'combo-populate-desc',
    sortKey: ProductOrderField.Rank,
    reverse: false
  }, // asc
  {
    title: ' Thứ tự theo điểm đánh giá',
    slug: 'combo-rating-desc',
    sortKey: ProductOrderField.Rating,
    reverse: true
  },
  {
    title: 'Mới nhất',
    slug: 'combo-newest-desc',
    sortKey: ProductOrderField.CreatedAt,
    reverse: true
  },
  {
    title: 'Thứ tự theo giá: thấp đến cao',
    slug: 'combo-price-asc',
    sortKey: ProductOrderField.Price,
    reverse: false
  },
  {
    title: 'Thứ tự theo giá: cao xuống thấp',
    slug: 'combo-price-desc',
    sortKey: ProductOrderField.Price,
    reverse: true
  }
];
export const TAGS = {
  collections: 'collections',
  products: 'products'
};

export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden';
export const DEFAULT_OPTION = 'Default Title';
