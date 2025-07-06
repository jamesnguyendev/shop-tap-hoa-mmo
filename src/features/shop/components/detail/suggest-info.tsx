import { CheckCircle2Icon } from 'lucide-react';

const requires = [
  {
    icon: CheckCircle2Icon,
    name: 'Thêm ít nhất 3 hình ảnh'
  },
  {
    icon: CheckCircle2Icon,
    name: 'Thêm video sản phẩm'
  },
  {
    icon: CheckCircle2Icon,
    name: 'Tên sản phẩm phải có ít nhất 2 ký tự'
  },
  {
    icon: CheckCircle2Icon,
    name: 'Thêm ít 2 ký tự và 1 hình ảnh trong mô tả'
  },
  {
    icon: CheckCircle2Icon,
    name: 'Thêm thương hiệu'
  }
];

const SuggestInfo = () => {
  return (
    <div className='h-fit min-w-[17rem] rounded-lg border border-t-4 border-gray-300 border-t-blue-600 *:p-3'>
      <div className='dark:bg-card bg-sky-100'>
        <h5 className='text-primary font-semibold'>Gợi ý điền thông tin</h5>
      </div>
      <div className=''>
        {requires.map((item, index) => {
          const Icon = item.icon;
          return (
            <div className='mb-1.5 flex items-center gap-2' key={index}>
              <Icon className='mt-1 h-5 w-5 shrink-0 text-gray-500' />
              <span className='text-primary text-[0.856rem] leading-snug'>
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SuggestInfo;
