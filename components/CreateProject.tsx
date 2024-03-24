'use client';

import { useState } from 'react';
import Modal from 'react-modal';
import Button from './Button';
import Input from './Input';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import axios from 'axios';

/* Define Portal -------------------- */
Modal.setAppElement('#modal');

// ─── Comp ─────────────────────────────────────────── 🟩 ─

const CreateProject = () => {
  const router = useRouter();
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [name, setName] = useState('');

  const { mutate: createProject, isPending } = useMutation({
    mutationFn: (name) => {
      return axios.post('/api/projects/create', { name });
    },
    onError: (error) => {
      console.log('We have error in mutation', error);
    },
    onSuccess: () => {
      // router.push('/');
      router.refresh();
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    createProject(name);
    setName('');
    closeModal();
  };

  return (
    <div className="px-6 py-8  hover:scale-105 transition-all ease-in-out duration-200 flex justify-center items-center ">
      <Button
        intent="primary"
        size="large"
        onClick={() => openModal()}
      >
        + New Project
      </Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-3/4 bg-white rounded-xl p-8 "
      >
        <h1 className="text-3xl mb-6">New Project</h1>
        <form
          className="flex items-center gap-4"
          onSubmit={handleSubmit}
        >
          <Input
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
export default CreateProject;
