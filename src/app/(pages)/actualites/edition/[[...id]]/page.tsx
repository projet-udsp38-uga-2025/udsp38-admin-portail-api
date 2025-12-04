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

  // If ID is provided but invalid, show 404
  if (id?.[0] && isNaN(actualiteId!)) {
    notFound();
  }

  const categories = await listCategoriesAction();

  // If no ID, render creation mode
  if (!actualiteId) {
    return <ActualiteEditionView categories={categories} />;
  }

  // If ID provided, fetch actualité and render edit mode
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