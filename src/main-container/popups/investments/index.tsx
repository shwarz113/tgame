import {InvestmentsItem} from "./item";
import {instrumentsLevelsMock, instrumentsMock} from "../../constants";

export const Investments = () => {
    return <div className={'investments-wrapper'}>
        {instrumentsMock.map((v, i) => (
            <InvestmentsItem key={v.name} data={v} level={instrumentsLevelsMock[i]} />
        ))}
    </div>
}