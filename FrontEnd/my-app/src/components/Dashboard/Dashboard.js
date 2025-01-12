import React, { useState, useEffect } from 'react';
import TaskBoard from './TaskBoard';
import { fetchTasks } from '../../api/api'; // Removed createTaskNLU
import TextInput from './TextInput';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: 20px;
`;

const Dashboard = ({ token, userId }) => {
    console.log('Dashboard props:', { token, userId });
    const [boards, setBoards] = useState({
        todo: { title: 'To Do', tasks: [], color: '#FF8C00' },
        inProgress: { title: 'In Progress', tasks: [], color: '#1E90FF' },
        done: { title: 'Done', tasks: [], color: '#32CD32' },
    });
    const [message, setMessage] = useState('');

    const loadTasks = async () => {
        try {
            const response = await fetchTasks(token);
            const userTasks = response.data.tasks;
            const categorized = {
                todo: { ...boards.todo, tasks: [] },
                inProgress: { ...boards.inProgress, tasks: [] },
                done: { ...boards.done, tasks: [] },
            };

            userTasks.forEach(task => {
                if (task.intent === 'create_task') {
                    categorized.todo.tasks.push(task);
                } else if (task.intent === 'start_task') {
                    categorized.inProgress.tasks.push(task);
                } else if (task.intent === 'complete_task') {
                    categorized.done.tasks.push(task);
                }
            });

            setBoards(categorized);
        } catch (error) {
            setMessage(error.response?.data?.error || 'Failed to load tasks.');
        }
    };

    useEffect(() => {
        loadTasks();
        // eslint-disable-next-line
    }, []);

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        const sourceBoard = boards[source.droppableId];
        const destBoard = boards[destination.droppableId];

        if (sourceBoard === destBoard) return;

        const task = sourceBoard.tasks.find(t => t.id.toString() === draggableId);

        // Update the task's intent based on the destination board
        let updatedIntent = '';
        if (destination.droppableId === 'todo') {
            updatedIntent = 'create_task';
        } else if (destination.droppableId === 'inProgress') {
            updatedIntent = 'start_task';
        } else if (destination.droppableId === 'done') {
            updatedIntent = 'complete_task';
        }

        // Ideally, you should send an API request to update the task's intent in the backend
        // For simplicity, we'll just update the frontend state

        if (updatedIntent) {
            task.intent = updatedIntent;
            const updatedBoards = {
                ...boards,
                [source.droppableId]: {
                    ...sourceBoard,
                    tasks: sourceBoard.tasks.filter(t => t.id.toString() !== draggableId),
                },
                [destination.droppableId]: {
                    ...destBoard,
                    tasks: [...destBoard.tasks, task],
                },
            };
            setBoards(updatedBoards);
        }
    };

    return (
        <DashboardContainer>
            <h2>Dashboard</h2>
            {message && <p>{message}</p>}
            <TextInput
                token={token}
                userId={userId}
                refreshTasks={loadTasks}
            />
            <TaskBoard boards={boards} onDragEnd={onDragEnd} />
        </DashboardContainer>
    );
};

export default Dashboard;