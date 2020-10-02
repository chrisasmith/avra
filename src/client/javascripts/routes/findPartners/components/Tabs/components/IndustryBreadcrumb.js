import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import styles from './styles/IndustryBreadCrumb.scss'
import { buildRoute, routes } from '../../../../../routes'

const propTypes = {
  industry: PropTypes.object,
  params: PropTypes.object,
}

const IndustryBreadcrumb = ({ industry, params }) => {
  if (!industry) { return null }


  return (
    <div className={styles.breadcrumb}>
      <div>
        <h5>{industry.name}</h5>
      </div>
      {industry.subsections && industry.subsections.sort((a, b) => a.name.localeCompare(b.name)).map((subsection, idx) => (
        <div className={styles.breadCrumbLink} key={subsection.id}>
          {params.subsection_id === subsection.id || (!params.subsection_id && idx === 0) ? (
            subsection.name
          ) : (
            <Link to={buildRoute(routes.FINDPARTNERS.INDUSTRY_SUBSECTION, { industry_id: params.industry_id, subsection_id: subsection.id })}>{subsection.name}</Link>
          )}
        </div>
      ))}
    </div>
  )
}

IndustryBreadcrumb.propTypes = propTypes
export default IndustryBreadcrumb
