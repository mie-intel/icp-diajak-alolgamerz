import Meet from '@/modules/dashboard/meet';

export default async function Page({ params }) {
  const param = await params;
  
  return <Meet roomId={param.slug}/>
}