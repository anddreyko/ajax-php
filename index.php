<?php

function get_address_by_id($id)
{
	switch($id)
	{
		case 1:
			return array ('first' => 'Иван', 'last' => 'Иванов', 'street' => 'ул. Ленина д. 123', 'city' => 'г. Зеленоград', 'state' => 'Московская обл.', 'zip' => '855384');
		case 2:
			return array ('first' => 'Владимир', 'last' => 'Петров', 'street' => 'ул. Октябрьская д. 12', 'city' => 'г. Сочи', 'state' => 'Краснодарский край', 'zip' => '045283');
	}
}

function get_address_string($id)
{
	$a = get_address_by_id($id);
	extract($a);

 	return "$first $last\n$street\n$city, $state $zip";
}

function screener($in){
		return Trim(htmlspecialchars($in));
	}

if(isset($_REQUEST['id']) && null!=($_REQUEST['id']=screener($_REQUEST['id'])))
    $id = $_REQUEST['id'];
echo get_address_string($id);
