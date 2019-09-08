import { useState } from 'react';

export type ComponentDetailsTab = 'Props' | 'Hooks';

export const useComponentDetailsTabs = () => {
  const [selectedTab, setSelectedTab] = useState<ComponentDetailsTab>('Props');

  const changeTab = (tab: ComponentDetailsTab) => setSelectedTab(tab);
  return {
    selectedTab,
    changeTab
  };
};
