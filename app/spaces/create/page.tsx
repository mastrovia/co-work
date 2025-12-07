'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { Header } from '@/components/layout/header';
import { SpaceForm } from '@/components/spaces/space-form';

export default function CreateSpacePage() {
  return (
    <AppLayout>
      <Header
        title="Add New Space"
        description="Create a new coworking space listing"
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Spaces', href: '/spaces' },
          { label: 'Create' },
        ]}
      />

      <SpaceForm />
    </AppLayout>
  );
}
