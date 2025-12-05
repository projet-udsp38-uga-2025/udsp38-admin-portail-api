"use client";

import {useState} from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  Calendar,
} from "@heroui/react";
import {CalendarDate, parseDate} from "@internationalized/date"; 

type ProgrammerPublicationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onPublierMaintenant: () => Promise<void> | void;
  onProgrammer: (datePublication: Date) => Promise<void> | void;
};

export default function ProgrammerPublicationModal({
  isOpen,
  onClose,
  onPublierMaintenant,
  onProgrammer,
}: ProgrammerPublicationModalProps) {
  const todayIso = new Date().toISOString().slice(0, 10);

  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(
    parseDate(todayIso)
  );
  const [selectedTime, setSelectedTime] = useState<string>("00:00");

  const handleProgrammer = async () => {
    if (!selectedDate || !selectedTime) return;

    const [hour, minute] = selectedTime.split(":").map(Number);

    const jsDate = new Date(
      selectedDate.year,
      selectedDate.month - 1,
      selectedDate.day,
      hour ?? 0,
      minute ?? 0
    );

    await onProgrammer(jsDate);
    onClose();
  };

  const handlePublierMaintenant = async () => {
    await onPublierMaintenant();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="center"
      backdrop="opaque"
      classNames={{
        backdrop: "bg-black/20",
        base: "max-w-sm w-full rounded-2xl",
      }}
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col items-center gap-2">
            <span className="text-lg font-semibold text-black">
              Programmer une publication
            </span>
          </ModalHeader>

          <ModalBody className="w-full flex flex-col items-center gap-4">
            <div className="overflow-hidden rounded-2xl">
              <Calendar
                aria-label="Date de publication"
                value={selectedDate ?? undefined}
                onChange={(value) => setSelectedDate(value as CalendarDate)}
                calendarWidth={260}
                showShadow={false}
                classNames={{
                  base: "bg-white rounded-2xl border border-gray-200",
                  gridWrapper: "overflow-visible",
                  title: "text-sm font-semibold text-black text-center",
                  headerWrapper: "text-black",
                  prevButton: "text-black",
                  nextButton: "text-black",
                  gridHeader: "text-xs text-gray-700",
                  gridHeaderCell: "text-xs text-gray-700",
                  cell: "text-sm text-black",
                  cellButton:
                    "text-sm text-black data-[selected=true]:bg-blue-600 data-[selected=true]:text-white",
                }}
              />
            </div>

            <div className="w-0 flex flex-col items-center gap-1">
              <span className="text-xs font-semibold text-black uppercase tracking-wide">
                Heure
              </span>

              <div className="relative w-36">
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full rounded-2xl border border-gray-300 bg-white py-2 pr-9 pl-3 text-center text-xl font-semibold text-black outline-none focus:ring-2 focus:ring-blue-600"
                />
        
              </div>
            </div>
          </ModalBody>

          <ModalFooter className="flex flex-col gap-2">
            <Button
              variant="bordered"
              className="w-full border-gray-300 text-gray-800 bg-gray-100"
              onPress={handlePublierMaintenant}
            >
              Publier maintenant
            </Button>

            <Button
              color="primary"
              className="w-full"
              onPress={handleProgrammer}
            >
              Programmer
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}
