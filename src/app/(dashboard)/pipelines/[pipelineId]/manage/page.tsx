"use client";
import DataTable from "@/components/global/DataTable";
import GoBack from "@/components/global/GoBack";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useAssignPipelineUserMutation,
  useGetPipelineQuery,
} from "@/redux/services/pipelineApi";
import {
  PipelineInterface,
  SelectInterface,
  UserInterface,
} from "@/types/interface";
import { Icon } from "@iconify/react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Select from "react-select";
import UserSelect from "@/components/global/select/UserSelect";
import { toast } from "react-toastify";
import { isFetchBaseQueryError } from "@/lib/helper";

type Props = {};

const ITEM_URL = "/users/";

function PipelineManage({}: Props) {
  const { pipelineId } = useParams();

  const pipelineQuery = useGetPipelineQuery({
    id: `${pipelineId}`,
    params: { populate: "assignees" },
  });

  const [assignUserPromptOpen, setAssignUserPromptOpen] =
    useState<boolean>(false);

  const columns = useMemo<ColumnDef<Omit<UserInterface, "password">>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="border-white"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "fullname",
        header: "Name",
        cell: ({ row }) => (
          <Link href={ITEM_URL + row.original._id} className="capitalize">
            {row.getValue("fullname")}
          </Link>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <Link href={ITEM_URL + row.original._id} className="capitalize">
            {row.getValue("email")}
          </Link>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => (
          <Button variant="destructive" className="capitalize">
            Remove
          </Button>
        ),
        footer: (props) => props.column.id,
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableHiding: false,
        enableSorting: false,
      },
    ],
    []
  );

  if (pipelineQuery.isSuccess)
    return (
      <div className="flex flex-col h-full">
        <section className="px-5 py-3 border-b">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GoBack />
              <h1 className="text-lg font-semibold">
                Manage{" "}
                <span className="text-muted-foreground">
                  ({pipelineQuery.data.name})
                </span>
              </h1>
            </div>
          </header>
        </section>
        <section className="flex-1 p-10">
          <header className="p-5 rounded bg-accent mb-10 flex w-full items-center justify-between">
            <div>
              <h2 className="text-muted-foreground">Pipeline Owner</h2>
              <p>Awesh Choudhary (You)</p>
            </div>
            <div>
              <Button
                className="mr-2"
                onClick={() => setAssignUserPromptOpen(true)}
              >
                <Icon icon="uil:plus" className="text-xl mr-2" />
                Assign User
              </Button>
              <Button variant="destructive" className="gap-2">
                <Icon
                  icon="solar:transfer-horizontal-outline"
                  className="text-xl"
                />
                Transfer Ownership
              </Button>
            </div>
          </header>
          <div>
            <DataTable
              columns={columns}
              data={{ ...pipelineQuery, data: pipelineQuery.data.assignees }}
              ITEM_URL={ITEM_URL}
            />
          </div>
        </section>
        <AssignUserPrompt
          open={assignUserPromptOpen}
          setOpen={setAssignUserPromptOpen}
          pipeline={pipelineQuery.data}
        />
      </div>
    );
}

const AssignUserPrompt = ({
  pipeline,
  open,
  setOpen,
}: {
  pipeline: PipelineInterface;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [selectedUser, setSelectedUser] = useState<SelectInterface>(
    {} as SelectInterface
  );

  const [assignUser, { isLoading, isSuccess, isError, error }] =
    useAssignPipelineUserMutation();

  const handleAssignUser = async () => {
    await assignUser({
      id: pipeline._id,
      update: { newUserId: selectedUser.value },
    });
    handleCancel();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted && isSuccess) {
      toast.success(`${selectedUser.label} User Assigned Successfully`);
    }
    if (isError) {
      const err: any = isFetchBaseQueryError(error) && error.data;
      toast.error(err?.message ?? "Something went wrong. Try again");
      console.log(error);
    }
    return () => {
      isMounted = false;
    };
  }, [isSuccess, error, isError]);

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[60%]">
        <DialogHeader>
          <DialogTitle>Assign New User</DialogTitle>
        </DialogHeader>
        <div className="p-5">
          <UserSelect
            setSelectedData={setSelectedUser}
            selectedData={selectedUser}
            label="Select User"
          />
        </div>
        <DialogFooter>
          <Button
            onClick={handleCancel}
            variant="outline"
            disabled={isLoading}
            type="button"
            className="mr-2"
          >
            Cancel
          </Button>
          <Button type="submit" onClick={handleAssignUser}>
            {isLoading ? "Assigning..." : "Assign"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PipelineManage;
