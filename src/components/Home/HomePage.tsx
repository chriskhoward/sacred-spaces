import BlockRenderer from '@/components/Blocks/BlockRenderer';

interface HomePageProps {
  blocks?: Array<{ _type: string; _key: string; [key: string]: any }>;
  documentId?: string;
  documentType?: string;
}

export default function HomePage({
  blocks = [],
  documentId,
  documentType
}: HomePageProps) {
  return (
    <div className="bg-white">
      <BlockRenderer
        blocks={blocks}
        documentId={documentId}
        documentType={documentType}
      />
    </div>
  );
}
