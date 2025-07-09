import UploadFileProduct from '@/features/product/uploadFileProduct';

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  console.log(id);

  return <UploadFileProduct />;
};

export default Page;
