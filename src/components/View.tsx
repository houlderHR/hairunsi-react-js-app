import React from "react"
import Button from "./ui/Button";
import InputSearch from "./ui/InputSearch";
import CardType from "./CardType";

const View: React.FC = () => {
  return <>
    <div className="lg:ml-72 sm:ml-52 ml-16 md:px-14 px-6 h-full pt-6 flex flex-col">
      <div className="flex flex-row gap-x-4">
        <Button additionalClass="md:min-w-60 hover:bg-secondary duration-300" />
        <InputSearch />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-2 w-full mt-8">
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