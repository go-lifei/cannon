import { Package, Variant } from '@/types/graphql/graphql';
import { FC } from 'react';
import 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism.css';
import { DataTable } from './DataTable';
import { createColumnHelper } from '@tanstack/react-table';
import * as chains from 'wagmi/chains';
import { Box } from '@chakra-ui/react';

const PackageTable: FC<{
  pkg: Package;
  latestOnly: boolean;
}> = ({ pkg, latestOnly }) => {
  type VariantRow = {
    chain: number;
    tag: string;
    preset: string;
    deploymentData: string;
    published: number;
    arrow?: string;
  };

  let data: VariantRow[] = pkg.variants.map((v: Variant) => {
    return {
      tag: v.tag.name,
      chain: v.chain_id,
      preset: v.preset,
      deploymentData: v.deploy_url,
      published: v.last_updated,
    };
  });

  const columnHelper = createColumnHelper<VariantRow>();

  const columns = [
    columnHelper.accessor('tag', {
      cell: (info) => info.getValue(),
      header: 'Version',
    }),
    columnHelper.accessor('preset', {
      cell: (info) => info.getValue(),
      header: 'Preset',
    }),
    columnHelper.accessor('chain', {
      cell: (info) => info.getValue(),
      header: 'Chain',
    }),
    columnHelper.accessor('deploymentData', {
      cell: (info) => info.getValue(),
      header: 'Deployment Data',
    }),
    columnHelper.accessor('published', {
      cell: (info) => info.getValue(),
      header: 'Published',
    }),
    columnHelper.accessor('arrow', {
      cell: '',
      header: '',
    }),
  ];

  if (latestOnly) {
    data = data.filter((row) => row.tag === 'latest');

    data = data.filter((row) => {
      const matchingChain = Object.values(chains).find((chain) => {
        return chain.id === row.chain;
      });
      return matchingChain && !(matchingChain as any).testnet;
    });
  }

  return data.length ? (
    <Box borderTop="1px solid" borderColor="gray.600">
      <DataTable packageName={pkg.name} columns={columns} data={data} />
    </Box>
  ) : (
    <></>
  );
};

export default PackageTable;
