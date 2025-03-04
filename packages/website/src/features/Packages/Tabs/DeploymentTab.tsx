'use client';

import { FC, useEffect, useState } from 'react';
import { GET_PACKAGE } from '@/graphql/queries';
import { useQueryCannonSubgraphData } from '@/hooks/subgraph';
import { Flex, Container } from '@chakra-ui/react';
import { DeploymentExplorer } from '@/features/Packages/DeploymentExplorer';
import { CustomSpinner } from '@/components/CustomSpinner';

export const DeploymentTab: FC<{
  name: string;
  tag: string;
  variant: string;
}> = ({ name, tag, variant }) => {
  const { data } = useQueryCannonSubgraphData<any, any>(GET_PACKAGE, {
    variables: { name },
  });

  useEffect(() => {
    if (data?.packages[0]) setPackage(data?.packages[0]);
  }, [data]);

  const [pkg, setPackage] = useState<any | null>(null);

  const currentVariant = pkg?.variants.find(
    (v: any) => v.name === variant && v.tag.name === tag
  );

  return (
    <Flex flexDirection="column" width="100%" mt="8">
      {currentVariant ? (
        <Container maxW="container.xl">
          <DeploymentExplorer pkgName={pkg.name} variant={currentVariant} />
        </Container>
      ) : (
        <CustomSpinner m="auto" />
      )}
    </Flex>
  );
};

export default DeploymentTab;
