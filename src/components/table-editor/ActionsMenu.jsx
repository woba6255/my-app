import { Menu, MoreIcon, Popover, Position } from "evergreen-ui"
import React from "react"
import PropTypes from "prop-types"

ActionsMenu.propTypes = {
	menuItems: PropTypes.array.isRequired
}

export const editBtnWidth = { maxWidth: '4rem' }

export function ActionsMenu({ menuItems }) {
	// TODO: refactor
	return <Popover
		position={Position.BOTTOM_LEFT}
		// isShown={showMenu}
		content={
			<Menu>
				<Menu.Group>
					{
						// TODO: Refactor ActionsMenu
						menuItems.map(item =>
							<Menu.Item {...item} key={item.title}>
								{
									item.title
								}
							</Menu.Item>
						)
					}
				</Menu.Group>
			</Menu>
		}
	>
		<MoreIcon
			style={{ cursor: "pointer" }}
			// onClick={setShowMenu(true)}
		/>
	</Popover>
}
