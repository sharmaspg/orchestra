import React from 'react';
import {
  useHistory
} from "react-router-dom"

import './TasksList.scss'

import Table from '@b12/metronome/components/layout/table/Table.es6'
import TableHead from '@b12/metronome/components/layout/table/TableHead.es6'
import TableBody from '@b12/metronome/components/layout/table/TableBody.es6'
import TableRow from '@b12/metronome/components/layout/table/TableRow.es6'
import TableCell from '@b12/metronome/components/layout/table/TableCell.es6'
import Badge from '@b12/metronome/components/layout/badge/Badge.es6.js'
import StatusIndicator from '@b12/metronome/components/layout/status-indicator/StatusIndicator.es6.js'

import AnimatedCircle from '../../assets/AnimatedCircle'

import { getPrettyDatetime, specialFormatIfToday } from '../../util/time'

type ProjectListProps = {
  status: any,
  tasks: any,
  isLoading?: boolean
}

const TaskList = ({ status, tasks, isLoading = false }: ProjectListProps) => {
  const rowsLabels = [
    'Details',
    'Project / Task',
    'Assigned',
    'Next steps',
    'Start by',
    'Due by'
  ]
  // Map Orchestra tag values to Metronome badge color values.
  const tagMapping = {
    'default': 'primary',
    'primary': 'primary',  // We'll add `selected` below to make it stand out.
    'success': 'success',
    'info': 'neutral',
    'warning': 'warning',
    'danger': 'warning'  // We'll add `selected` below to make it stand out.
  }
  const history = useHistory()

  const renderTasks = () => {
    return tasks.map(row => {
      const assigned = getPrettyDatetime(row.assignment_start_datetime, 'MM/DD/YYYY')
      const startBy = getPrettyDatetime(
        row.next_todo_dict.start_by_datetime,
        specialFormatIfToday(row.next_todo_dict.start_by_datetime))
      const dueBy = getPrettyDatetime(
        row.next_todo_dict.due_datetime,
        specialFormatIfToday(row.next_todo_dict.due_datetime))

      return (
        <TableRow key={row.id} onClick={() => history.push(`/task/${row.id}`)}>
          <TableCell>
            <h4>{row.detail}</h4>
            {row.tags.map(tag => {
              const colorProps = {
                [tagMapping[tag.status]]: true,
                selected: tag.status === 'danger' || tag.status === 'primary' // Make it darker.
              }
              return (
                <Badge size="small" label={tag.label} filled className='dsu-mr-xxxsm' {...colorProps}/>
              )})}
          </TableCell>
          <TableCell><p>{row.project} / {row.step}</p></TableCell>
          <TableCell><p>{assigned}</p></TableCell>
          <TableCell><p>{row.next_todo_dict.description}</p></TableCell>
          <TableCell><p>{startBy}</p></TableCell>
          <TableCell><p>{dueBy}</p></TableCell>
        </TableRow>
      )})
  }

  const renderEmptyList = () => (
    <TableRow>
      <TableCell/>
      <TableCell/>
      <TableCell><p>No tasks</p></TableCell>
      <TableCell/>
      <TableCell/>
      <TableCell/>
    </TableRow>
  )

  const numberOfTasksText = `${tasks.length} task${tasks.length > 1 ? 's' : ''}`

  return (
    <div className='tasks-list__wrapper'>
      <Table
        padding='compact'
        verticalAlign='middle'
        className='tasks-list'
        cardLike
      >
        <TableHead padding="compact">
          <TableRow>
            <TableCell className='tasks-list__status-row'>
              <b><StatusIndicator
                status={status}
                className='dsu-mr-xxxsm'
                statusLabels={{
                  success: 'Active',
                  error: 'Paused',
                  default: 'Completed',
                  warning: 'Pending'
                }}
              /></b>
              {isLoading ? <AnimatedCircle /> : <p>{numberOfTasksText}</p>}
            </TableCell>
            <TableCell/>
            <TableCell/>
            <TableCell/>
            <TableCell/>
            <TableCell/>
          </TableRow>
        </TableHead>
        <TableHead>
          <TableRow>
            {rowsLabels.map(rowLabel => (
              <TableCell
                key={rowLabel}
                align='left'
              ><p>{rowLabel}</p></TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.length !== 0 || isLoading
            ? renderTasks()
            : renderEmptyList()}
        </TableBody>
      </Table>
    </div>

  )
}

export default TaskList