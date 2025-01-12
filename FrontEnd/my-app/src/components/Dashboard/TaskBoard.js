import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const BoardsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
`;

const Board = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 10px;
  border-radius: 5px;
  width: 30%;
  min-height: 300px;
`;

const TaskCard = styled.div`
  background: ${({ color }) => color || '#333'};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  color: #fff;
`;

const TaskBoard = ({ boards, onDragEnd }) => {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <BoardsContainer>
                {Object.entries(boards).map(([boardId, board], index) => (
                    <Droppable droppableId={boardId} key={boardId}>
                        {(provided) => (
                            <Board ref={provided.innerRef} {...provided.droppableProps}>
                                <h3>{board.title}</h3>
                                {board.tasks.map((task, idx) => (
                                    <Draggable key={task.id} draggableId={task.id.toString()} index={idx}>
                                        {(provided) => (
                                            <TaskCard
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                color={board.color}
                                            >
                                                <p>{task.text}</p>
                                                <small>Intent: {task.intent}</small>
                                            </TaskCard>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </Board>
                        )}
                    </Droppable>
                ))}
            </BoardsContainer>
        </DragDropContext>
    );
};

export default TaskBoard;