import React from "react";
import { Input, Button, Chip } from "@heroui/react";
import {
  Search,
  EllipsisVertical,
  FileText,
  Clock,
  CheckCircle,
  Hourglass,
} from "lucide-react";
import Link from "next/link";

const TableRooms = () => {
  return (
    <div className="card bg-bgCard rounded-xl shadow-[0_5px_18px_#00000005]">
      <div className="flex items-center justify-between lg:mb-4 mb-6 px-4 pt-4">
        <h2 className="text-colorTitle font-semibold">Liste des réunions</h2>
        <div>
          <Input
            type="text"
            variant="bordered"
            placeholder="Trouvez une réunion"
            classNames={{
              inputWrapper:
                "bg-transparent border-colorBorder border-[1px] shadow-none",
            }}
            startContent={<Search size={20} />}
          />
        </div>
      </div>
      <table className="table w-full table-bordered">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Date</th>
            <th>Durée</th>
            <th>Participants</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-bgGray">
            <td>
              <Link href={"/rooms/1"}>
                <div className="flex items-center gap-1">
                  <div className="icon text-colorMuted">
                    <FileText size={18} />
                  </div>
                  <span className="text-colorTitle">
                    Recording - 19 August 2025
                  </span>
                </div>
              </Link>
            </td>
            <td>
              <span>19/08/2025</span>
            </td>
            <td>
              <span>3h</span>
            </td>
            <td>
              <span>3h</span>
            </td>
            <td>
              <Chip
                className="bg-[#2ac66618]  text-[#2ac667] text-[12px]"
                size="sm"
              >
                Terminée
              </Chip>
            </td>
            <td>
              <div className="flex items-center gap-2">
                <Button className="min-w-0 bg-transparent hover:bg-bgGray text-colorTitle p-0 w-[32px] h-[32px]">
                  <EllipsisVertical size={16} />
                </Button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="flex items-center gap-1">
                <div className="icon text-colorMuted">
                  <FileText size={18} />
                </div>
                <span className="text-colorTitle">
                  Recording - 19 August 2025
                </span>
              </div>
            </td>
            <td>
              <span>19/08/2025</span>
            </td>
            <td>
              <span>-</span>
            </td>
            <td>
              <span>-</span>
            </td>
            <td>
              <Chip
                className="bg-[#f08d501b]  text-[#f08c50] text-[12px]"
                size="sm"
              >
                En cours
              </Chip>
            </td>
            <td>
              <div className="flex items-center gap-2">
                <Button className="min-w-0 bg-transparent hover:bg-bgGray text-colorTitle p-0 w-[32px] h-[32px]">
                  <EllipsisVertical size={16} />
                </Button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="flex items-center gap-1">
                <div className="icon text-colorMuted">
                  <FileText size={18} />
                </div>
                <span className="text-colorTitle">
                  Recording - 19 August 2025
                </span>
              </div>
            </td>
            <td>
              <span>19/08/2025</span>
            </td>
            <td>
              <span>-</span>
            </td>
            <td>
              <span>-</span>
            </td>
            <td>
              <Chip
                className="bg-[#ecb4321d]  text-[#ecb532] text-[12px]"
                size="sm"
              >
                En attente
              </Chip>
            </td>
            <td>
              <div className="flex items-center gap-2">
                <Button className="min-w-0 bg-transparent hover:bg-bgGray text-colorTitle p-0 w-[32px] h-[32px]">
                  <EllipsisVertical size={16} />
                </Button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="flex items-center gap-1">
                <div className="icon text-colorMuted">
                  <FileText size={18} />
                </div>
                <span className="text-colorTitle">
                  Recording - 19 August 2025
                </span>
              </div>
            </td>
            <td>
              <span>19/08/2025</span>
            </td>
            <td>
              <span>Transcription</span>
            </td>
            <td>
              <div className="flex items-center gap-2">
                <Button className="min-w-0 bg-transparent hover:bg-bgGray text-colorTitle p-0 w-[32px] h-[32px]">
                  <EllipsisVertical size={16} />
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableRooms;
