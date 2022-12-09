import './App.css'
import Clock from "./components/Clock";
import {useSearchParams} from "react-router-dom";
import {ChangeEvent, CSSProperties, SyntheticEvent} from "react";
import {
    Box,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Paper,
    Stack
} from "@mui/material";
import * as React from "react";

function App() {
  const [search, setSearchParams] = useSearchParams();
  const timeFirst = search.get('timeFirst') === 'true';
  const twoLines = search.get('twoLines') === 'true';
  const trim = search.get('trim') === 'time' ? 'time' : search.get('trim') === 'date' ? 'date' : undefined;
  const second = search.get('second') === 'true' ? 'numeric' as const : undefined;
  const hour12 = search.get('hour12') === 'true' ? true : undefined;
  const color = search.get('color') || undefined;
  const fontSize = search.get('fontSize') || undefined;
  const fontFamily = search.get('fontFamily') || undefined;
  const fontWeight = search.get('fontWeight') || undefined;
  const textAlign = search.get('textAlign') as CSSProperties['textAlign'] || undefined; //todo: TYPE BETTER because default goes to left
    const booleanParams = ['timeFirst', 'twoLines', 'second', 'hour12'];
    const isBooleanParam = (param:string) => booleanParams.includes(param)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean, queryParam:string)=>{
        console.log('event', event)
        console.log('queryParam', queryParam)
        if(isBooleanParam(queryParam) && checked){
            search.set(queryParam, checked.toString())
            setSearchParams(search)
        }else if(isBooleanParam(queryParam)){
            search.set(queryParam, checked.toString())
            setSearchParams(search)
        }else if (checked){
            search.set(queryParam, event.target.name)
            setSearchParams(search)
        }else{
            search.set(queryParam, '')
            setSearchParams(search)
        }
    }
  return (
    <div className="App">
      <Stack>
        <Box>
          <Clock
              trim={trim}
              twoLines={twoLines}
              timeFirst={timeFirst}
              second={second}
              color={color}
              fontSize={fontSize}
              fontFamily={fontFamily}
              fontWeight={fontWeight}
              textAlign={textAlign}
              hour12={hour12} />
        </Box>
      </Stack>
    <Paper>
        <Container sx={{padding: '40px'}}>
            <Stack direction={'row'} spacing={4}>
                <FormControl>
                    <FormLabel>Trim</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={
                            <Checkbox
                                name={'date'}
                                checked={trim === 'date'}
                                onChange={(event: ChangeEvent<HTMLInputElement>, checked: boolean) => handleChange(event, checked, 'trim')}/>}
                                label={'Time Only'}
                        />
                        <FormControlLabel
                            control={
                            <Checkbox
                                name={'time'}
                                checked={trim === 'time'}
                                onChange={(event: ChangeEvent<HTMLInputElement>, checked: boolean) => handleChange(event, checked, 'trim')}/>}
                            label={'Date Only'}
                        />
                    </FormGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>Two Lines</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={
                            <Checkbox
                                name={'twoLines'}
                                checked={twoLines}
                                onChange={(event: ChangeEvent<HTMLInputElement>, checked: boolean) => handleChange(event, checked, 'twoLines')}/>}
                                label={'Two Lines'}
                        />
                    </FormGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>Time First</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name={'timeFirst'}
                                    checked={timeFirst}
                                    onChange={(event: ChangeEvent<HTMLInputElement>, checked: boolean) => handleChange(event, checked, 'timeFirst')}/>}
                            label={'Time First'}
                        />
                    </FormGroup>
                </FormControl>
            </Stack>
        </Container>
    </Paper>
    </div>
  )
}

export default App
