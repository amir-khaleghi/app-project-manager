'use client';

import { useRef, useState } from 'react';
import Modal from 'react-modal';
import Button from './Button';
import Input from './Input';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import axios from 'axios';

/* Define Portal -------------------- */
Modal.setAppElement('#modal');

// ─── Comp ─────────────────────────────────────────── 🟩 ─

const CreateTask = ({ id }) => {
  const router = useRouter();
  const [modalIsOpen, setIsOpen] = useState(false);
  const taskInput = useRef(null);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [name, setName] = useState('');

  const { mutate: newTask, isPending } = useMutation({
    mutationFn: () => {
      return axios.post(`/api/projects/${id}`, { name });
    },
    onError: (error) => {
      console.log('We have error in mutation', error.message);
    },
    onSuccess: () => {
      router.push(`/project/${id}`);
      router.refresh();
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await newTask(name);
    setName('');
    closeModal();
  };

  return (
    <div className=" py-8  hover:scale-105 transition-all ease-in-out duration-200 flex justify-center items-center ">
      {isPending ? (
        <Button
          className="w-40 items-center justify-center flex"
          intent="secondary"
          size="medium"
        >
          <div className="loader2"></div>
        </Button>
      ) : (
        <Button
          className="w-40"
          intent="secondary"
          size="medium"
          onClick={() => openModal()}
        >
          + New Task
        </Button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-3/4 bg-white rounded-xl p-8 "
      >
        <h1 className="text-3xl mb-6">New Task</h1>
        <form
          className="flex items-center gap-4"
          onSubmit={handleSubmit}
        >
          <Input
            ref={taskInput}
            required
            placeholder="project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {isPending ? (
            <Button
              size="small"
              intent="secondary"
              type="submit"
              className="loader"
            ></Button>
          ) : (
            <Button
              size="small"
              intent="secondary"
              type="submit"
            >
              Create
            </Button>
          )}
        </form>
      </Modal>
    </div>
  );
};
export default CreateTask;
