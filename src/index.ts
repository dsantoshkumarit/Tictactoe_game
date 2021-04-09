let player1flag:boolean = true;
let wonflag:boolean = false;
let selectionmatrix=[[-1,-1,-1,-1],[-1,0,0,0],[-1,0,0,0],[-1,0,0,0]];



//Checking won or not function 
function checkHorizontal(checknum:number){
    
    if(selectionmatrix[1][1]==checknum && selectionmatrix[1][2]==checknum && selectionmatrix[1][3]==checknum)
    {
        return true;
    }
    else if(selectionmatrix[2][1]==checknum && selectionmatrix[2][2]==checknum && selectionmatrix[2][3]==checknum)
    {
        return true;
    }
    else if(selectionmatrix[3][1]==checknum && selectionmatrix[3][2]==checknum && selectionmatrix[3][3]==checknum)
    {
        return true;
    }
    return false;
}

function checkVertical(checknum:number){
    
    if(selectionmatrix[1][1]==checknum && selectionmatrix[2][1]==checknum && selectionmatrix[3][1]==checknum)
    {
        return true;
    }
    else if(selectionmatrix[1][2]==checknum && selectionmatrix[2][2]==checknum && selectionmatrix[3][2]==checknum)
    {
        return true;
    }
    else if(selectionmatrix[1][3]==checknum && selectionmatrix[2][3]==checknum && selectionmatrix[3][3]==checknum)
    {
        return true;
    }
    return false;
}

function checkDiagonal(checknum:number){
    
    if(selectionmatrix[1][1]==checknum && selectionmatrix[2][2]==checknum && selectionmatrix[3][3]==checknum)
    {
        return true;
    }
    else if(selectionmatrix[1][3]==checknum && selectionmatrix[2][2]==checknum && selectionmatrix[3][1]==checknum)
    {
        return true;
    }    
    return false;
}

function checkWin(checknum:number):boolean{
    
    if( checkHorizontal(checknum) || checkVertical(checknum) || checkDiagonal(checknum))
    {
        return true;
    }
    else
    {
        return false;
    }
}

function isDraw(){
    for(let valarr of selectionmatrix )
    {
        for(let val of valarr)
        {
            if(val==0)
            {
                return false;
            }
        }
    }

    return true;
}

function getWonCells(playerval:number)
{
    let count=0;
    let retarr:number[][]=[];
    if(checkHorizontal(playerval))
    {
        selectionmatrix.forEach((row,i)=>{
            count=0;
            row.forEach((rowval)=>{
                if(rowval==playerval)
                {
                    count++;
                }
            });
            if(count==3)
            {
                retarr.push([i,1],[i,2],[i,3]);
            }
        });
    }
    else if(checkVertical(playerval))
    {
        [1,2,3].forEach((j)=>{
            count=0;
            [1,2,3].forEach((i)=>{
                if(selectionmatrix[i][j]==playerval)
                {
                    count++;
                }
            });
            if(count==3)
            {
                retarr.push([1,j],[2,j],[3,j]);
            }
        });
    }
    else if(checkDiagonal(playerval))
    {
        count=0;
        [[1,1],[2,2],[3,3]].forEach((row)=>{
            if(selectionmatrix[row[0]][row[1]]==playerval)
            {
                count++;
            }
        });
        if(count==3)
        {
            retarr.push([1,1],[2,2],[3,3]);
        }
        count=0;
        [[1,3],[2,2],[3,1]].forEach((row)=>{
            if(selectionmatrix[row[0]][row[1]]==playerval)
            {
                count++;
            }
        });
        if(count==3)
        {
            retarr.push([1,3],[2,2],[3,1]);
        }
    }
    return retarr;
}

//Player 1 vs player 2 mode:
document.querySelector('button#p1vsp2btn')?.addEventListener('click',()=>{
    let modeselectiondiv=document.getElementById('modeselection');
    let p1vsp2div=document.getElementById('p1vsp2div');
    let p1vp2p1=document.getElementById('p1vp2p1');
    let p1vp2p2=document.getElementById('p1vp2p2');
    let p1vp2para=document.getElementById('p1vp2para');
    let p1vp2alert=document.getElementById('p1vp2alert');
    if(modeselectiondiv && p1vsp2div && p1vp2p2)
    {
        modeselectiondiv.style.display='none';
        p1vsp2div.style.display='block';
        p1vp2p2.style.display='none';
        p1vsp2div?.scrollIntoView();
        
        
        let tdarr=document.querySelectorAll('td');
        let selectionindices=[[1,1],[1,2],[1,3],[2,1],[2,2],[2,3],[3,1],[3,2],[3,3]];
        tdarr.forEach((cell,i)=>{            
            if(i<9)
            {
                cell.addEventListener('mousedown',function(){            
                    if(this.innerHTML!=='⭕' && this.innerHTML!=='❌')
                    {
                        if(player1flag)
                        {
                            this.innerHTML="❌";                 
                            selectionmatrix[selectionindices[i][0]][selectionindices[i][1]]=1;                                          
                            player1flag=false;
                            wonflag=false;
                            if(checkWin(1))
                            {           
                                let woncells=getWonCells(1);                    
                                woncells.forEach((cell)=>{
                                    let cellelem=document.getElementById("cell"+cell[0]+cell[1]);                
                                    cellelem!.style.background='#99a8b2';
                                });                                                        
                                p1vp2alert!.style.display='block';
                                p1vp2para!.innerHTML='Player 1 - ❌ Won';
                                selectionmatrix=[[-1,-1,-1,-1],[-1,0,0,0],[-1,0,0,0],[-1,0,0,0]];
                                player1flag=true;
                                wonflag=true;
                                setTimeout(()=>{
                                    tdarr.forEach((tdelem,idx)=>{
                                        if(idx<9)
                                        {
                                            tdelem.innerHTML='&nbsp;';
                                        }                                        
                                    });
                                    woncells.forEach((cell)=>{
                                        let cellelem=document.getElementById("cell"+cell[0]+cell[1]);                
                                        cellelem!.style.background='inherit';
                                    });   
                                    p1vp2alert!.style.display='none';
                                },2000);                             
                            }
                            if(!wonflag)
                            {
                                p1vp2p1!.style.display='none';
                                p1vp2p2!.style.display='block';                            
                            }                        
                        }
                        else
                        {
                            this.innerHTML='⭕';                    
                            selectionmatrix[selectionindices[i][0]][selectionindices[i][1]]=2;   
                            player1flag=true;
                            if(checkWin(2))
                            {                       
                                let woncells=getWonCells(2);                    
                                woncells.forEach((cell)=>{
                                    let cellelem=document.getElementById("cell"+cell[0]+cell[1]);                
                                    cellelem!.style.background='#99a8b2';
                                });          
                                p1vp2alert!.style.display='block';
                                p1vp2para!.innerHTML='Player 2 - ⭕ Won';
                                wonflag=false;
                                selectionmatrix=[[-1,-1,-1,-1],[-1,0,0,0],[-1,0,0,0],[-1,0,0,0]];
                                setTimeout(()=>{
                                    tdarr.forEach((tdelem,idx)=>{
                                        if(idx<9)
                                        {
                                            tdelem.innerHTML='&nbsp;';
                                        }                                        
                                    });     
                                    woncells.forEach((cell)=>{
                                        let cellelem=document.getElementById("cell"+cell[0]+cell[1]);                
                                        cellelem!.style.background='inherit';
                                    });            
                                    p1vp2alert!.style.display='none';                    
                                },2000);
                                
                            } 
                            p1vp2p1!.style.display='block';
                            p1vp2p2!.style.display='none';
                        }

                        if(isDraw())
                        {
                            let p1vp2draw=document.getElementById('p1vp2draw');                            
                            p1vp2draw!.style.display='block';     
                            selectionmatrix=[[-1,-1,-1,-1],[-1,0,0,0],[-1,0,0,0],[-1,0,0,0]];
                            player1flag=true;
                            wonflag=false;
                            setTimeout(()=>{
                                tdarr.forEach((tdelem,idx)=>{
                                    if(idx<9)
                                    {
                                        tdelem.innerHTML='&nbsp;';
                                    }                                   
                                });
                                p1vp2draw!.style.display='none';  
                            },2000);     
                            p1vp2p1!.style.display='block';
                            p1vp2p2!.style.display='none';                  
                        }
                    }
                } );
            }
        });
    }
});


//Reset Button Button for p1vsp2
document.querySelector('#reset1')?.addEventListener('click',()=>{
    selectionmatrix=[[-1,-1,-1,-1],[-1,0,0,0],[-1,0,0,0],[-1,0,0,0]];
    player1flag=true;
    document.querySelectorAll('td').forEach((tdelem,idx)=>{
        if(idx<9)
        {
            tdelem.innerHTML='&nbsp;';
        }
    });
    wonflag=false;
    let p1vp2p1=document.getElementById('p1vp2p1');
    let p1vp2p2=document.getElementById('p1vp2p2');
    p1vp2p1!.style.display='block';
    p1vp2p2!.style.display='none';
});


function checkDoubleDiagonal(playerval:number)
{
    let count=0;
    let zerovalindex: number[]=[];
    let zerovalindexflag=false;
    [[1,1],[2,2],[3,3]].forEach((row)=>{        
        if(selectionmatrix[row[0]][row[1]]==playerval)
        {
            count++;
        }
        else if(selectionmatrix[row[0]][row[1]]==0)
        {
            zerovalindexflag=true;
            zerovalindex=row;
        }                
    });

    if(count==2 && zerovalindexflag)
    {
        return zerovalindex;
    }

    count=0;
    zerovalindex=[];
    zerovalindexflag=false;
    [[1,3],[2,2],[3,1]].forEach((row)=>{
        if(selectionmatrix[row[0]][row[1]]===playerval)
        {
            count++;
        }
        else if(selectionmatrix[row[0]][row[1]]===0)
        {
            zerovalindexflag=true;
            zerovalindex=row;
        } 
    });

    if(count==2 && zerovalindexflag)
    {
        return zerovalindex;
    }

    return [];
}

function checkDoubleColumn(playerval:number)
{
    let count=0;
    let zerovalindex=0;

    for(let i=1;i<4;i++)
    {
        count=0;
        zerovalindex=0;
        for(let j=1;j<4;j++)
        {
            if(selectionmatrix[j][i]===playerval)
            {
                count++;
            }        
            else if(selectionmatrix[j][i]===0)
            {
                zerovalindex=j;
            }   
        }
        if(count==2 && zerovalindex!=0)
        {
            return [zerovalindex,i];
        }
    }
    return [];
}

function checkDoubleRow(playerval:number)
{
    let count=0;
    let zerovalindex=0;
    for(let i=1;i<4;i++)
    {
        count=0;
        zerovalindex=0;
        for(let j=1;j<4;j++)
        {
            if(selectionmatrix[i][j]===playerval)
            {                
                count++;
            }
            else if(selectionmatrix[i][j]===0)
            {
                zerovalindex=j;
            }
        }
        if(count==2 && zerovalindex!=0)
        {
            return [i,zerovalindex];
        }
    }
    return [];
}


//checks double similar vals in row, cols ,diagonals
function checkDouble(playerval:number){
    let rowpos=checkDoubleRow(playerval);
    let colpos=checkDoubleColumn(playerval);
    let diagpos=checkDoubleDiagonal(playerval);
    if(rowpos.length>0)
    {
        return rowpos;
    }
    else if(colpos.length>0)
    {
        return colpos;
    }
    else if(diagpos.length>0)
    {
        return diagpos;
    }
    else
    {
        return [];
    }
}

//Computers next move
function nextMovePosition(){
    let p1double=checkDouble(1);
    let compdouble=checkDouble(2);
    if(p1double.length>0)
    {
        return p1double;
    }
    else if(compdouble.length>0)
    {
        return compdouble;
    }
    
    for(let i=1;i<4;i++)
    {
        for(let j=1;j<4;j++)
        {
            if(selectionmatrix[i][j]===0)
            {
                return [i,j];
            }
        }
    }
    return [];
}


function nextCompMove()
{
    let p1vcompp1=document.getElementById('p1vcompp1');
    let p1vcc=document.getElementById('p1vcompcomp');
    let p1vcompalert=document.getElementById('p1vcompalert');
    let p1vcomppara=document.getElementById('p1vcomppara');
    let tdarr=document.querySelectorAll('td');
    let nextmovepos=nextMovePosition();    
    if(nextmovepos.length>0) 
    {
        let cellpos=document.getElementById("pvccell"+nextmovepos[0]+nextmovepos[1]);
        if(cellpos?.innerHTML!=='❌' && cellpos?.innerHTML!=='⭕')
        {
            cellpos!.innerHTML='⭕';
            selectionmatrix[nextmovepos[0]][nextmovepos[1]]=2;
        }
        player1flag=true;
        if(checkWin(2))
        {
            let woncells=getWonCells(2);                    
            woncells.forEach((cell)=>{
                let cellelem=document.getElementById("pvccell"+cell[0]+cell[1]);                
                cellelem!.style.background='#99a8b2';
            });            
            p1vcompalert!.style.display='block';
            p1vcomppara!.innerHTML='Computer - ⭕ Won';
            wonflag=false;
            selectionmatrix=[   [-1,-1,-1,-1],
                                [-1,0,0,0],
                                [-1,0,0,0],
                                [-1,0,0,0] ];
            setTimeout(()=>{
                tdarr.forEach((tdelem,idx)=>{
                    if(idx>8)
                    {
                        tdelem.innerHTML='&nbsp;';
                    }
                });    
                p1vcompalert!.style.display='none';
                woncells.forEach((cell)=>{
                    let cellelem=document.getElementById("pvccell"+cell[0]+cell[1]);
                    cellelem!.style.background='inherit';
                });                                
            },2000);
        } 
        p1vcompp1!.style.display='block';
        p1vcc!.style.display='none';
    }
}


//Player 1 vs Computer mode:
document.querySelector('button#p1vscompbtn')?.addEventListener('click',()=>{
    
    let modeselectiondiv=document.getElementById('modeselection');
    let p1vscompdiv=document.getElementById('p1vscompdiv');
    let p1vcompp1=document.getElementById('p1vcompp1');
    let p1vcc=document.getElementById('p1vcompcomp');
    let p1vcompalert=document.getElementById('p1vcompalert');
    let p1vcomppara=document.getElementById('p1vcomppara');
    if(modeselectiondiv && p1vscompdiv && p1vcc)
    {        
        modeselectiondiv.style.display='none';
        p1vscompdiv.style.display='block';
        p1vcc.style.display='none';
        p1vscompdiv?.scrollIntoView();        
        
        //
        
        let tdarr=document.querySelectorAll('td');
        let selectionindices=[[1,1],[1,2],[1,3],[2,1],[2,2],[2,3],[3,1],[3,2],[3,3]];
        tdarr.forEach((cell,i)=>{            
            if(i>8)
            {
                cell.addEventListener('mousedown',function(){            
                    if(this.innerHTML!=='⭕' && this.innerHTML!=='❌')
                    {
                        if(player1flag)
                        {
                            this.innerHTML="❌";                 
                            selectionmatrix[selectionindices[i-9][0]][selectionindices[i-9][1]]=1;                                          
                            player1flag=false;
                            wonflag=false;
                            if(checkWin(1))
                            {
                                let woncells=getWonCells(1);                    
                                woncells.forEach((cell)=>{
                                    let cellelem=document.getElementById("pvccell"+cell[0]+cell[1]);                
                                    cellelem!.style.background='#99a8b2';
                                });                                                                                                      
                                p1vcompalert!.style.display='block';
                                p1vcomppara!.innerHTML='Player 1 - ❌ Won';
                                selectionmatrix=[[-1,-1,-1,-1],[-1,0,0,0],[-1,0,0,0],[-1,0,0,0]];
                                player1flag=true;
                                wonflag=true;
                                setTimeout(()=>{
                                    tdarr.forEach((tdelem,idx)=>{
                                        if(idx>8)
                                        {
                                            tdelem.innerHTML='&nbsp;';
                                        }                                        
                                    });
                                    woncells.forEach((cell)=>{
                                        let cellelem=document.getElementById("pvccell"+cell[0]+cell[1]);
                                        cellelem!.style.background='inherit';
                                    });  
                                    p1vcompalert!.style.display='none';
                                },2000);                             
                            }
                            if(!wonflag)
                            {
                                p1vcompp1!.style.display='none';
                                p1vcc!.style.display='block';                            
                            }    
                            setTimeout(nextCompMove,1000);                                           
                        }                    
                        if(isDraw())
                        {
                            let p1vcompdraw=document.getElementById('p1vcompdraw');                            
                            p1vcompdraw!.style.display='block';     
                            selectionmatrix=[[-1,-1,-1,-1],[-1,0,0,0],[-1,0,0,0],[-1,0,0,0]];
                            console.log(selectionmatrix);  
                            player1flag=true;
                            wonflag=false;
                            setTimeout(()=>{
                                tdarr.forEach((tdelem,idx)=>{
                                    if(idx>=9)
                                    {
                                        tdelem.innerHTML='&nbsp;';
                                    }                                    
                                });
                                p1vcompdraw!.style.display='none';  
                            },2000);     
                            p1vcompp1!.style.display='block';
                            p1vcc!.style.display='none';      
                            console.log(selectionmatrix);            
                        }
                    }
                } );
            }
        });
    }
});


//Reset Button Button for p1vscomp
document.querySelector('#reset2')?.addEventListener('click',()=>{
    selectionmatrix=[[-1,-1,-1,-1],[-1,0,0,0],[-1,0,0,0],[-1,0,0,0]];
    player1flag=true;
    document.querySelectorAll('td').forEach((tdelem,idx)=>{
        if(idx>8)
        {
            tdelem.innerHTML='&nbsp;';
        }
    });
    wonflag=false;
    let p1vcompp1=document.getElementById('p1vcompp1');
    let p1vcompcomp=document.getElementById('p1vcompcomp');
    p1vcompp1!.style.display='block';
    p1vcompcomp!.style.display='none';
});




