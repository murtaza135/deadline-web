import { Deadline } from "@prisma/client"
import React, { ReactNode, useCallback, useMemo } from "react"
import { useState } from "react"

type DeadlineDate = {
  date: Date,
  deadlines: (Deadline | null)[]
}

type ModalDataContext = {
  showCover: boolean,
  showModal: boolean,
  modalDeadlines: DeadlineDate,
}

type ModalMutatorContext2 = {
  openModal: (d: DeadlineDate) => void,
  closeModal: () => void,
}

export const ContextData = React.createContext<ModalDataContext>(
  { showCover: false, showModal: false, modalDeadlines: { date: new Date(), deadlines: [] } }
)
export const ContextMutator = React.createContext<ModalMutatorContext2>({ openModal: () => { }, closeModal: () => { } })

export function ModalProvider({ children, modal }: { children: ReactNode, modal: ReactNode }) {

  const [modalDeadlines, setModalDeadlines] = useState<DeadlineDate>({ date: new Date(), deadlines: [] })

  const [showModal, setShowModal] = useState(false)
  const [showCover, setshowCover] = useState(false)

  // console.log("modal provider render");

  const openModal = useCallback((d: DeadlineDate) => {
    setModalDeadlines(d);
    setshowCover(true);
    setTimeout(() => setShowModal(true), 10);
    document.body.classList.add("modalOpen");
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setTimeout(() => setshowCover(false), 300);
    document.body.classList.remove("modalOpen");
  }, []);

  const values = useMemo(() => ({
    openModal, closeModal
  }), [openModal, closeModal]);

  return (
    <ContextMutator.Provider value={values}>
      {children}
      <ContextData.Provider value={{ showCover, showModal, modalDeadlines }}>
        {modal}
      </ContextData.Provider>
    </ContextMutator.Provider>
  )
}