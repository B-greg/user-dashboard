import Image from "next/image";
import { FC, ReactElement, memo } from "react";
import User from "../models/users";

type UserCardProps = {
  user: User;
};

const UserCard: FC<UserCardProps> = ({ user }): ReactElement => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow py-1 px-2">
      <Image
        className="max-w-full"
        width={512}
        height={512}
        src={user.avatar}
        alt="User Picture"
      />
      <p className="text-blue-500">{`#${user.id}`}</p>

      <table className="table-auto">
        <tbody>
          <TableBody name="First Name" value={user.firstName} />
          <TableBody name="Last Name" value={user.lastName} />
          <TableBody name="Email" value={user.email} />
        </tbody>
      </table>
    </div>
  );
};

type TableBodyProps = {
  name: String;
  value: String;
};

const TableBody: FC<TableBodyProps> = ({ name, value }): ReactElement => {
  return (
    <tr>
      <td className="font-bold whitespace-nowrap text-black">{name}</td>
      <td className="text-black">:</td>
      <td className="break-all text-blue-500">{value}</td>
    </tr>
  );
};

export default memo(UserCard);
