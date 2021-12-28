import MenuIcon from '@mui/icons-material/Menu'
import PlaceIcon from '@mui/icons-material/Place'
import Button from '@mui/material/Button'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import hasRouteAccess from '../../functions/route/hasRouteAccess'
import { routes, RoutesEnum } from '../../routes/appRoutes'
import { useRootState } from '../../state/store'
import './style.scss'

interface Props {}

export const NavigationMobile = (p: Props) => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)

  const authState = useRootState().auth
  const history = useHistory()

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    )
      return

    setOpen(false)
  }

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }

    prevOpen.current = open
  }, [open])

  const renderMainLinks = () =>
    routes
      .filter(r => r.renderLink)
      .map(r =>
        hasRouteAccess(r, authState) ? (
          <Link key={r.path} to={r.path}>
            <MenuItem
              style={{
                fontWeight: history.location.pathname.endsWith(r.path)
                  ? 700
                  : 400,
              }}
              onClick={handleClose}>
              {r.linkName}
            </MenuItem>
          </Link>
        ) : null
      )
      .filter(r => r) as JSX.Element[]

  return (
    <div id='nav' className='d-flex justify-content-between align-items-center'>
      <div>
        <b>
          <Link to={RoutesEnum.HOME}>
            <PlaceIcon /> SkateSpot
          </Link>
        </b>
      </div>

      <div>
        {authState.content && (
          <Link className='me-2' to={RoutesEnum.USER_PROFILE}>
            {authState.content.userName}
          </Link>
        )}
        <Button ref={anchorRef} id='composition-button' onClick={handleToggle}>
          <MenuIcon />
        </Button>
        <Popper
          id='mobile-nav'
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement='bottom-start'
          transition
          disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    className='py-0'
                    autoFocusItem={open}
                    onKeyDown={handleListKeyDown}>
                    {renderMainLinks()}
                    {authState.content ? (
                      <Link to={RoutesEnum.LOGOUT}>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                      </Link>
                    ) : (
                      <>
                        <Link to={RoutesEnum.LOGIN}>
                          <MenuItem onClick={handleClose}>Login</MenuItem>
                        </Link>
                        <Link to={RoutesEnum.REGISTER}>
                          <MenuItem onClick={handleClose}>Register</MenuItem>
                        </Link>
                      </>
                    )}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  )
}
