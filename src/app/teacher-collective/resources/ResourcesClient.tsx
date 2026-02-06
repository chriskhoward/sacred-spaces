'use client';

import { useState, useMemo } from 'react';

interface Resource {
  _id: string;
  title: string;
  description?: string;
  linkUrl?: string;
  isLocked?: boolean;
  author?: string;
  image?: string;
  targetAudience?: string;
}

interface GroupedResource {
  category: string;
  items: Resource[];
}

interface ResourcesClientProps {
  groupedResources: GroupedResource[];
  userTier: string;
}

export default function ResourcesClient({ groupedResources, userTier }: ResourcesClientProps) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const categoryOptions = useMemo(() => {
    const list = groupedResources.map((g) => g.category).filter(Boolean);
    return list;
  }, [groupedResources]);

  const filteredGroups = useMemo(() => {
    if (!categoryFilter) return groupedResources;
    return groupedResources.filter((g) => g.category === categoryFilter);
  }, [groupedResources, categoryFilter]);

  const handleResourceClick = (resource: Resource) => {
    // Check if resource is locked and user is on free tier
    if (resource.isLocked && userTier === 'free') {
      setSelectedResource(resource);
      setShowUpgradeModal(true);
    } else if (resource.linkUrl) {
      window.open(resource.linkUrl, '_blank', 'noopener,noreferrer');
    } else {
      // If no linkUrl, show a message
      alert('This resource is not yet available. Please check back later.');
    }
  };

  const closeModal = () => {
    setShowUpgradeModal(false);
    setSelectedResource(null);
  };

  if (groupedResources.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No resources found. Check back later!
      </div>
    );
  }

  return (
    <>
      {categoryOptions.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            type="button"
            onClick={() => setCategoryFilter(null)}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
              categoryFilter === null
                ? 'bg-(--color-primary) text-white shadow-lg'
                : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-(--color-roti) hover:text-(--color-primary)'
            }`}
          >
            All
          </button>
          {categoryOptions.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                categoryFilter === cat
                  ? 'bg-(--color-primary) text-white shadow-lg'
                  : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-(--color-roti) hover:text-(--color-primary)'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-16">
        {filteredGroups.map((section: GroupedResource, idx: number) => (
          <div key={idx}>
            <h2 className="text-3xl font-bold text-(--color-primary) mb-8 flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-(--color-roti) block"></span>
              {section.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.items.map((item: Resource) => (
                <div
                  key={item._id}
                  onClick={() => handleResourceClick(item)}
                  className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition-all border border-transparent hover:border-(--color-roti) group cursor-pointer"
                >
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                    <span className="bg-(--color-gallery) text-(--color-primary) px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                      Resource
                    </span>
                    <div className="flex items-center gap-2">
                      {item.targetAudience && item.targetAudience !== 'all' && (
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                          {item.targetAudience === 'teacher' ? 'Teachers' : 'Practitioners'}
                        </span>
                      )}
                        {item.isLocked && (
                        <span className="text-gray-400 text-lg">🔒</span>
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-(--color-primary) mb-3 group-hover:text-(--color-roti) transition-colors">
                    {item.title}
                  </h3>
                  {item.author && (
                    <p className="text-sm text-gray-500 mb-2">by {item.author}</p>
                  )}
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  <button className="text-(--color-primary) font-bold text-sm uppercase tracking-wider hover:underline">
                    {item.isLocked && userTier === 'free' ? 'Upgrade to Access →' : 'Access Resource →'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && selectedResource && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold text-(--color-primary) mb-2">
                Premium Resource
              </h3>
              <p className="text-gray-600">
                This resource is available to premium members only.
              </p>
            </div>
            
            <div className="bg-(--color-gallery) p-4 rounded-lg mb-6">
              <p className="font-bold text-(--color-primary) mb-2">{selectedResource.title}</p>
              {selectedResource.description && (
                <p className="text-sm text-gray-600">{selectedResource.description}</p>
              )}
            </div>

            <div className="space-y-4">
              <p className="text-gray-700 text-center">
                Upgrade to a premium membership to access this and all other premium resources.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-bold hover:bg-gray-50 transition-colors"
                >
                  Maybe Later
                </button>
                <a
                  href="/apply"
                  className="flex-1 px-6 py-3 bg-(--color-roti) text-white rounded-full font-bold hover:bg-(--color-primary) transition-colors text-center"
                >
                  Upgrade Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
