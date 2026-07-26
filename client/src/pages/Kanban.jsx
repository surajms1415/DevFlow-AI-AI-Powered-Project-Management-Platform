import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Clock, Paperclip, MessageSquare } from 'lucide-react';

const initialData = {
  columns: {
    'col-1': { id: 'col-1', title: 'Backlog', taskIds: ['task-1', 'task-2'] },
    'col-2': { id: 'col-2', title: 'Todo', taskIds: ['task-3'] },
    'col-3': { id: 'col-3', title: 'In Progress', taskIds: ['task-4'] },
    'col-4': { id: 'col-4', title: 'Review', taskIds: [] },
    'col-5': { id: 'col-5', title: 'Done', taskIds: ['task-5'] },
  },
  tasks: {
    'task-1': { id: 'task-1', content: 'Design System Polish', priority: 'High', date: 'Oct 12', assignees: ['JD'], comments: 3, attachments: 1 },
    'task-2': { id: 'task-2', content: 'Onboarding Flow', priority: 'Medium', date: 'Oct 15', assignees: ['AS'], comments: 0, attachments: 0 },
    'task-3': { id: 'task-3', content: 'Database Schema', priority: 'Urgent', date: 'Oct 10', assignees: ['MK', 'JD'], comments: 5, attachments: 2 },
    'task-4': { id: 'task-4', content: 'Kanban Drag and Drop', priority: 'High', date: 'Oct 11', assignees: ['JD'], comments: 2, attachments: 0 },
    'task-5': { id: 'task-5', content: 'Project Setup', priority: 'Low', date: 'Oct 1', assignees: ['MK'], comments: 1, attachments: 0 },
  },
  columnOrder: ['col-1', 'col-2', 'col-3', 'col-4', 'col-5'],
};

const PriorityBadge = ({ priority }) => {
  const colorMap = {
    'Low': 'default',
    'Medium': 'primary',
    'High': 'warning',
    'Urgent': 'danger'
  };
  return <Badge variant={colorMap[priority] || 'default'} className="text-[10px] py-0">{priority}</Badge>;
};

const Kanban = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...start, taskIds: newTaskIds };
      setData({ ...data, columns: { ...data.columns, [newColumn.id]: newColumn } });
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = { ...start, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = { ...finish, taskIds: finishTaskIds };

    setData({
      ...data,
      columns: { ...data.columns, [newStart.id]: newStart, [newFinish.id]: newFinish },
    });
  };

  return (
    <div className="p-6 h-[calc(100vh-64px)] flex flex-col max-w-[1600px] mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Project Alpha Board</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage your tasks and workflow</p>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-6 h-full items-start">
            {data.columnOrder.map((columnId) => {
              const column = data.columns[columnId];
              const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

              return (
                <div key={column.id} className="w-[320px] shrink-0 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200/60 dark:border-slate-700 max-h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4 px-1">
                    <h3 className="font-semibold text-slate-700 dark:text-slate-200 text-sm">{column.title}</h3>
                    <span className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs py-0.5 px-2 rounded-full font-medium">
                      {tasks.length}
                    </span>
                  </div>
                  
                  <Droppable droppableId={column.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 overflow-y-auto min-h-[150px] transition-colors rounded-lg ${snapshot.isDraggingOver ? 'bg-slate-100 dark:bg-slate-800' : ''}`}
                      >
                        <div className="space-y-3 pb-2">
                          {tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{...provided.draggableProps.style}}
                                >
                                  <Card className={`shadow-sm border border-slate-200/60 dark:border-slate-700 cursor-grab active:cursor-grabbing hover:border-indigo-300 dark:hover:border-indigo-500 transition-colors ${snapshot.isDragging ? 'shadow-lg rotate-2 scale-105' : ''}`}>
                                    <CardBody className="p-4 space-y-3">
                                      <div className="flex justify-between items-start">
                                        <PriorityBadge priority={task.priority} />
                                      </div>
                                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug">{task.content}</p>
                                      
                                      <div className="flex items-center justify-between pt-2">
                                          <div className="flex items-center space-x-3 text-slate-400 dark:text-slate-500">
                                          <div className="flex items-center text-xs">
                                            <Clock size={14} className="mr-1" /> {task.date}
                                          </div>
                                          {(task.comments > 0 || task.attachments > 0) && (
                                            <div className="flex items-center space-x-2 text-xs">
                                              {task.comments > 0 && <span className="flex items-center"><MessageSquare size={12} className="mr-1"/> {task.comments}</span>}
                                              {task.attachments > 0 && <span className="flex items-center"><Paperclip size={12} className="mr-1"/> {task.attachments}</span>}
                                            </div>
                                          )}
                                        </div>
                                        <div className="flex -space-x-2">
                                          {task.assignees.map((initial, i) => (
                                            <Avatar key={i} initials={initial} size="sm" className="border-2 border-white w-6 h-6 text-[10px]" />
                                          ))}
                                        </div>
                                      </div>
                                    </CardBody>
                                  </Card>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Kanban;
