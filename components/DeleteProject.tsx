'use client';

import { useState } from 'react';
import Modal from 'react-modal';
import Button from './Button';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Trash2 } from 'lucide-react';

/* Define Portal -------------------- */
Modal.setAppElement('#modal');

// ─── Comp ─────────────────────────────────────────── 🟩 ─

const DeleteProject = ({ id }) => {
  const router = useRouter();
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const { mutate: deleteProject, isPending } = useMutation({
    mutationFn: async () => {
      return axios.delete(`/api/projects/${id}`);
    },
    onError: (err) => {
      console.log('error in mutation:', err);
    },
    onSuccess: () => {
      router.push('/home');
      router.refresh();
    },
  });

  return (
    <div className="transition-all ease-in-out duration-200 flex justify-center items-center ">
      <Button
        onClick={() => openModal()}
        className="absolute z-10 right-0  p-2   top-0 "
      >
        <Trash2 />
      </Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
        className="w-fit flex flex-col sm:flex-row items-center justify-center gap-4 bg-white rounded-xl p-8 "
      >
        <h1 className="text-3xl ">Are you sure?</h1>

        <div className="flex gap-8">
          {isPending ? (
            <Button
              size="small"
              intent="secondary"
              type="submit"
              className=" w-20 items-center justify-center flex"
            >
              <div className="loader2"></div>
            </Button>
          ) : (
            <Button
              className="w-20"
              onClick={() => deleteProject()}
              size="small"
              intent="secondary"
              type="submit"
            >
              Yes
            </Button>
          )}
          <Button
            className="w-20"
            onClick={() => closeModal()}
            size="small"
            intent="secondary"
            type="submit"
          >
            No
          </Button>
        </div>
      </Modal>
    </div>
  );
};
export default DeleteProject;
