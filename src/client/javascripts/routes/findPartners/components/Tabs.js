import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { LinkContainer } from 'react-router-bootstrap'
import { NavDropdown } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import { routes } from '../../../routes'

const propTypes = {
  location: PropTypes.object.isRequired,
  industries: PropTypes.array,
}

const Tabs = ({ location, industries }) => (
  <ul className="nav nav-tabs">
    <li className="nav-item">
      <Link
        className={classnames('nav-link', { active: location.pathname === routes.FINDPARTNERS.ROOT })}
        to={routes.FINDPARTNERS.ROOT}
      >
        <FormattedMessage
          id="find_partners.tabs.overview"
          defaultMessage="Overview"
        />
      </Link>
    </li>
    <NavDropdown title="Industries" active={location.pathname.startsWith(routes.FINDPARTNERS.INDUSTRIES)}>
      {industries && industries.sort((a, b) => a.name.localeCompare(b.name)).map(industry => (
        <LinkContainer to={`${routes.FINDPARTNERS.INDUSTRIES}/${industry.id}`} key={industry.id}>
          <NavDropdown.Item>
            {industry.name}
          </NavDropdown.Item>
        </LinkContainer>
      ))}
    </NavDropdown>
    <li className="nav-item">
      <Link
        className={classnames('nav-link', { active: location.pathname.startsWith(routes.FINDPARTNERS.BRANDS) })}
        to={routes.FINDPARTNERS.BRANDS}
      >
        <FormattedMessage
          id="find_partners.tabs.brands"
          defaultMessage="Brands"
        />
      </Link>
    </li>
    <li className="nav-item">
      <Link
        className={classnames('nav-link', { active: location.pathname.startsWith(routes.FINDPARTNERS.TRENDS) })}
        to={routes.FINDPARTNERS.TRENDS}
      >
        <FormattedMessage
          id="find_partners.tabs.Trends"
          defaultMessage="Trends"
        />
      </Link>
    </li>
  </ul>
)

Tabs.propTypes = propTypes
export default Tabs
