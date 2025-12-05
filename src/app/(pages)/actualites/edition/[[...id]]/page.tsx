export const dynamic = "force-dynamic";

import { notFound } from 'next/navigation';
import ActualiteEditionView from '@/ui/views/ActualiteEditionView';
import { getActualiteByIdAction } from '@/ui/actions/ActualiteActions';
import { listCategoriesAction } from '@/ui/actions/CategorieActions';

interface PageProps {
  params: Promise<{ id?: string[] }>;
}

export default async function ActualiteEdition({ params }: PageProps) {
  const { id } = await params;
  const actualiteId = id?.[0] ? Number(id[0]) : null;

  if (id?.[0] && isNaN(actualiteId!)) {
    notFound();
  }

  const categories = await listCategoriesAction();

  if (!actualiteId) {
    return <ActualiteEditionView categories={categories} />;
  }
  const actualiteResult = await getActualiteByIdAction(actualiteId);

  if (!actualiteResult.success || !actualiteResult.data) {
    notFound();
  }

  return (
    <ActualiteEditionView 
      actualite={actualiteResult.data} 
      categories={categories} 
    />
  );
}