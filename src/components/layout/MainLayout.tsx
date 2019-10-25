import React from 'react'
import { withTranslation, WithTranslation } from 'react-i18next'
import { Layout, Menu, Icon } from 'antd'
import { MENU } from '../../constants/menu'
import { map } from 'lodash'

import { history } from '../../utils/history'

const { Header, Content } = Layout

type Props = WithTranslation & {
	children: React.ReactNode
	selectedMenuItem?: string
}

const MainLayout = ({ children, selectedMenuItem, t }: Props) => {
	return (
		<Layout className="layout">
			<Header>
				<div className="logo"/>
				<Menu
					theme="dark"
					mode="horizontal"
					selectedKeys={selectedMenuItem ? [selectedMenuItem] : []}
				>
					{map(MENU, (item) => (
						<Menu.Item key={item.type} onClick={() => history.push(t(item.path))}>
							<Icon type={item.icon}/>
							{t(item.title)}
						</Menu.Item>
					))}
				</Menu>
			</Header>
			<Content style={{ padding: '20px 50px' }}>
				{children}
			</Content>
		</Layout>
	)
}

export default withTranslation()(MainLayout)
