import { Button, Checkbox, Slider, TextField } from '@material-ui/core'

interface Props {
  surfaceScoreEnabled: boolean
  setSurfaceScoreEnabled: React.Dispatch<React.SetStateAction<boolean>>
  surfaceScoreGTFilter: boolean
  setSurfaceScoreGTFilter: React.Dispatch<React.SetStateAction<boolean>>
  surfaceScore: number
  setSurfaceScore: React.Dispatch<React.SetStateAction<number>>
}

export const SurfaceScoreFilter = ({
  surfaceScoreEnabled,
  setSurfaceScoreEnabled,
  surfaceScoreGTFilter,
  setSurfaceScoreGTFilter,
  surfaceScore,
  setSurfaceScore,
}: Props) => {
  const handleSurfaceScoreInputChange = (value: number) => {
    if (value > 10) setSurfaceScore(10)
    else if (value < 1) setSurfaceScore(1)
    else setSurfaceScore(value)
  }

  return (
    <div className='mt-4'>
      <p className='m-0'>Surface score</p>
      <div className='d-flex align-items-center'>
        <Checkbox
          onChange={() => setSurfaceScoreEnabled(!surfaceScoreEnabled)}
          checked={surfaceScoreEnabled}
        />
        <Button
          disabled={!surfaceScoreEnabled}
          className='py-0'
          onClick={() => setSurfaceScoreGTFilter(!surfaceScoreGTFilter)}
          style={{ fontSize: '1.2rem' }}>
          {surfaceScoreGTFilter ? '≥' : '≤'}
        </Button>
        <Slider
          disabled={!surfaceScoreEnabled}
          min={1}
          max={10}
          value={surfaceScore}
          onChange={(_, value) =>
            handleSurfaceScoreInputChange(value as number)
          }
        />
        <TextField
          disabled={!surfaceScoreEnabled}
          variant='standard'
          className='ms-3'
          value={surfaceScore}
          size='small'
          onChange={e => handleSurfaceScoreInputChange(Number(e.target.value))}
          type='number'
          InputProps={{
            inputProps: {
              max: 10,
              min: 1,
            },
          }}
        />
      </div>
    </div>
  )
}
