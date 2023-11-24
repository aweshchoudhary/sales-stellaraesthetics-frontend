import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AssignUserPrompt = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Assign User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign New User</DialogTitle>
        </DialogHeader>

        <DialogFooter>
          <Button type="button" className="mr-2">
            Cancel
          </Button>
          <Button type="submit">Assign</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignUserPrompt;
