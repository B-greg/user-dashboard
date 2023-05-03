import React, { FC, ReactElement, memo, use } from "react";
import User from "../models/users";
import Image from "next/image";

type UserCardProps = {
  user: User;
};

const UserCard: FC<UserCardProps> = ({ user }): ReactElement => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 py-1 px-2">

        <Image
          className="max-w-full"
          width={512}
          height={512}
          src={user.avatar}
          alt="User Picture"
        />
        <p>#{user.id}</p>

        <table className="table-auto">
          <tbody>
          <TableBody name="First Name" value={user.first_name}  />
          <TableBody name="Last Name" value={user.last_name}  />
          <TableBody name="Email" value={user.email}  />
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
      <td className="font-bold whitespace-nowrap">{name}</td>
      <td>:</td>
      <td className="break-all">{value}</td>
    </tr>
  );
};

export default memo(UserCard);