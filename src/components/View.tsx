import React from "react"
import Button from "./ui/Button";
import InputSearch from "./ui/InputSearch";
import CardType from "./CardType";

const View: React.FC = () => {
  return <>
    <div className="ml-72 px-14 h-full pt-6 flex flex-col">
      <div className="flex flex-row gap-x-4">
        <Button additionalClass="min-w-60 hover:bg-secondary duration-300" />
        <InputSearch />
      </div>
      <div className="flex flex-row gap-4 flex-wrap items-center justify-arround mt-8">
        <CardType title="Direction" iconVisible={true} name="Super admin"/>
        <CardType title="Administration" name="Admin"/>
        <CardType title="Commercial" name="Modérateur"/>
        <CardType title="Responsable Prod" name="Chef"/>
        <CardType title="Production" name="Employé"/>
      </div>
    </div>
  </>
}

export default View;