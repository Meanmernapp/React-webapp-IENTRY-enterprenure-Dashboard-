import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { Checkbox } from "@mui/material";

const WorkShiftTreeView = ({ data,onInputchange,isChecked }) => {
    return (
        <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        >
            {
                data?.map(item => {
                    return (
                        <TreeItem nodeId={item?.id} label={
                            <React.Fragment>
                            <Checkbox className="grid-checkall checkbox" value={`${item?.id},${item?.name}`} onChange={onInputchange}
                             checked={isChecked.includes(`${item?.id},${item?.name}`)}
                            />
                            {item?.name}
                          </React.Fragment>
                        }>

                            {
                                item?.children.map(childItem => {
                                    return (
                                        <TreeItem nodeId={childItem?.id} label={
                                            <React.Fragment>
                                            <Checkbox className="grid-checkall checkbox" value={`${childItem?.id},${childItem?.name}`} onChange={onInputchange}
                                            checked={isChecked.includes(`${childItem?.id},${childItem?.name}`)}
                                            />
                                            {childItem?.name}
                                          </React.Fragment>
                                        } >
                                            {
                                                 childItem?.children.map(grandChild =>{
                                                    return(
                                                        <TreeItem nodeId={grandChild?.id} label={
                                                            <React.Fragment>
                                                            <Checkbox className="grid-checkall checkbox" value={`${grandChild?.id},${grandChild?.name}`} onChange={onInputchange}
                                                            checked={isChecked.includes(`${grandChild?.id},${grandChild?.name}`)}
                                                             />
                                                            {grandChild?.name}
                                                          </React.Fragment>
                                                        } />  
                                                    )
                                                 })
                                            }
                                            </TreeItem>
                                    )
                                })
                            }


                        </TreeItem>
                    )
                })
            }
            {/* <TreeItem nodeId="1" label="Applications">
        <TreeItem nodeId="2" label="Calendar" />
      </TreeItem>
      <TreeItem nodeId="5" label="Documents">
        <TreeItem nodeId="10" label="OSS" />
        <TreeItem nodeId="6" label="MUI">
          <TreeItem nodeId="8" label="index.js" />
        </TreeItem>
      </TreeItem> */}
        </TreeView>
    );
}

export default WorkShiftTreeView