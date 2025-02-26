import { modals } from '@mantine/modals'
import { Table, Text } from '@mantine/core'

import RecordRowActionMenu from './RecordRowActionMenu'

import styles from './index.module.scss'

import type { Record } from '@/lib/types'
import type { RecordsPage } from '@/lib/types'

const RecordTable = ({ withQuery, recordsPage }: { withQuery: boolean; recordsPage: RecordsPage }) => {
  const openDetailModal = (record: Record) => {
    modals.openContextModal({
      modalId: 'recordDetailModal',
      modal: 'recordDetailModal',
      size: 'xl',
      title: `ID: ${record.id}`,
      innerProps: { record },
    })
  }

  return (
    <Table highlightOnHover layout={'fixed'}>
      <Table.Thead>
        <Table.Tr>
          {/* <Table.Th w={'48'}></Table.Th> */}
          {withQuery && <Table.Th w={'10%'}>Distance</Table.Th>}
          <Table.Th w={'10%'}>ID</Table.Th>
          <Table.Th w={'40%'}>Document</Table.Th>
          <Table.Th w={withQuery ? '20%' : '30%'}>Metadata</Table.Th>
          <Table.Th w={'auto'}>Embedding</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {recordsPage?.records.map(record => (
          <Table.Tr key={record.id} onClick={() => openDetailModal(record)}>
            {/* <Table.Td className={styles.td}>
              <RecordRowActionMenu embedding={record.embedding.join(', ')} />
            </Table.Td> */}
            {withQuery && <Table.Td className={styles.td}>{record.distance}</Table.Td>}
            <Table.Td className={styles.td}>
              <Text span size={'sm'}>
                {record.id}
              </Text>
            </Table.Td>
            <Table.Td className={styles.td}>{record.document}</Table.Td>
            <Table.Td className={styles.td}>{record.metadata ? JSON.stringify(record.metadata) : ''}</Table.Td>
            <Table.Td className={styles.td}>{record.embedding.join(', ')}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}

export default RecordTable
