import { useEffect, useRef, useState } from 'react';
import Observer from 'src/entities/Observer';
import TodoList from '../entities/TodoList';
import TodoGateway from '../gateways/TodoGateway';

export const useTodoList = (todoGateway: TodoGateway) => {
    const [, setItems] = useState<any[]>([]);
    const todoListRef = useRef<TodoList | null>(null);

    const handleUpdateItems = () => {
        if (todoListRef.current) {
            setItems([...todoListRef.current.items]);
        }
    };

    useEffect(() => {
        (async () => {
            todoListRef.current = await todoGateway.getTodos();

            todoListRef?.current?.register(
                new Observer('addItem', async function (item: any) {
                    await todoGateway.addItem(item);
                    handleUpdateItems();
                }),
            );

            todoListRef?.current?.register(
                new Observer('removeItem', async function (item: any) {
                    await todoGateway.removeItem(item.id);
                    handleUpdateItems();
                }),
            );

            todoListRef?.current?.register(
                new Observer('toggleDone', async function (item: any) {
                    await todoGateway.updateItem(item);
                    handleUpdateItems();
                }),
            );

            handleUpdateItems();

        })();
    }, []);

    return {
        todoList: todoListRef.current,
    };
};
