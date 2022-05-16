import React, { useState } from 'react'
import pdfImg from '../../../assets/images/pdf.svg'
import cancel from '../../../assets/images/ic-cancel.svg'
import back from '../../../assets/images/back.svg'
import AddDocsModal from './CompanyModals/addDocsModal'
import { Link } from 'react-router-dom'

const DocumentsPanel = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <div className="container documentsPanel">
        <div className='head'>
          <div className='headLeft'>
            <Link to="/dashboard/company">
              <i className="fa fa-arrow-left" aria-hidden="true"></i>
            </Link>
            <h2>documents panel</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <div className="table-heading">
              <p>EMPLOYEES</p>
              <button onClick={() => handleShow(true)}>ADD DOCUMENT+</button>
              <AddDocsModal show={show}
                onHide={() => handleClose(false)} />
            </div>

          </div>
          <div className="col-6">
            <div className='documents-detail-sec'>

              <div className="table-header">
                <div>DOCUMENT NAME</div>
                <div className='text-center'>FROM</div>
                <div className='text-end'>REMOVE</div>
              </div>
              <div className='data-row first-row'>
                <div>IMSS</div>
                <div className='text-center'>IMSS</div>
                <div className='text-end'>
                  <img className='cancel' src={cancel} alt="cancel" />
                </div>
              </div>
              <div className='data-row second-row'>
                <div>IMSS</div>
                <div className='text-center'>
                  <img src={pdfImg} alt="pdf" />
                  <p className='pdf-paragraph'>formato_informacion _personal.pdf</p>
                </div>
                <div className='text-end'>
                  <img className='cancel' src={cancel} alt="cancel" />
                </div>
              </div>
              <div className='data-row third-row'>
                <div>IMSS</div>
                <div className='text-center'>IMSS</div>
                <div className='text-end'>
                  <img className='cancel' src={cancel} alt="cancel" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-8 contractors">
            <div className="table-heading">
              <p>CONTRACTORS / PROVIDER</p>
              <button>ADD DOCUMENT+</button>
            </div>
          </div>
          <div className="col-6">
            <div className='documents-detail-sec'>

              <div className="table-header">
                <div>DOCUMENT NAME</div>
                <div className='text-center'>FROM</div>
                <div className='text-end'>REMOVE</div>
              </div>
              <div className='data-row first-row'>
                <div>IMSS</div>
                <div className='text-center'>IMSS</div>
                <div className='text-end'>
                  <img className='cancel' src={cancel} alt="cancel" />
                </div>
              </div>
              <div className='data-row second-row'>
                <div>IMSS</div>
                <div className='text-center'>
                  <img src={pdfImg} alt="pdf" />
                  <p>formato_informacion _personal.pdf</p>
                </div>
                <div className='text-end'>
                  <img className='cancel' src={cancel} alt="cancel" />
                </div>
              </div>
              <div className='data-row third-row'>
                <div>IMSS</div>
                <div className='text-center'>IMSS</div>
                <div className='text-end'>
                  <img className='cancel' src={cancel} alt="cancel" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default DocumentsPanel