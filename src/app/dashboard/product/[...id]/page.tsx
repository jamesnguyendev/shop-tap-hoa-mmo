import UploadFileProduct from '@/features/product/uploadFileProduct';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const productID = decodeURIComponent((await params)?.id[0]);
  const variantID = (await params)?.id[1];

  return <UploadFileProduct productID={productID} variantID={variantID} />;
};

export default Page;
