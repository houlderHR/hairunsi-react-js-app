import React from "react"
import InputSearch from "../../Common/InputSearch";
import CardType from "../../CardType";
import ButtonAdd from "../../Common/ButtonAdd";


const View: React.FC = () => {
  return <>
      <div className="flex flex-row gap-x-4">
        <ButtonAdd additionalClass="md:min-w-60 hover:bg-secondary duration-300" />
        <InputSearch />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-2 w-full mt-8">
        <CardType title="Direction" iconVisible={true} name="Super admin"/>
        <CardType title="Administration" name="Admin"/>
        <CardType title="Commercial" name="Modérateur"/>
        <CardType title="Responsable Prod" name="Chef"/>
        <CardType title="Production" name="Employé"/>
      </div>
  </>
}

export default View;